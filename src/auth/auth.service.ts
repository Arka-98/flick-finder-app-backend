import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { KafkaService, TOPICS, UserUtil } from '@flick-finder/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly kafkaService: KafkaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const createdUser = new this.userModel(registerUserDto);

    await createdUser.save();

    const { password, ...value } = createdUser.toJSON();

    this.kafkaService.emit(TOPICS.USER.CREATED, { value });

    return {
      accessToken: this.jwtService.sign({
        sub: createdUser._id,
        username: createdUser.name,
        role: createdUser.role,
      }),
      user: createdUser,
    };
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.userModel.findOne({ email }).exec();
    let hashedPassword: string = '';
    let salt: string = '';

    if (user) {
      [hashedPassword, salt] = user.password.split('.');
    }

    if (!user || !UserUtil.comparePassword(password, hashedPassword, salt)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: this.jwtService.sign({
        sub: user._id,
        username: user.name,
        role: user.role,
      }),
      user,
    };
  }
}
