import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from '@flick-finder/common';

@Public()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  @ApiOkResponse({
    type: RegisterUserDto,
    description: 'Register new user',
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    const response = await this.authService.register(registerUserDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({
    type: LoginUserDto,
    description: 'Login user',
  })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
