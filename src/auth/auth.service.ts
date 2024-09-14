import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserUtil } from 'src/utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const createdUser = new this.userModel(registerUserDto);

    await createdUser.save();

    return {
      accessToken: this.jwtService.sign({
        sub: createdUser._id,
        username: createdUser.name,
      }),
      user: createdUser.toJSON(),
    };
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.userModel.findOne({ email }).exec();
    let hashedPassword: string = '';
    let salt: string = '';

    if (user) {
      [hashedPassword, salt] = user?.password.split('.');
    }

    if (!user || !UserUtil.comparePassword(password, hashedPassword, salt)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: this.jwtService.sign({ sub: user._id, username: user.name }),
      user,
    };
  }
}
