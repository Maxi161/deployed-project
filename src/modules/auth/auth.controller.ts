import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';
import { CreateUserDto, LoginUserDto } from '../../dtos/createUser.dto';
import { UserService } from '../user/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getAuth() {
    return this.authService.userAuth();
  }

  @Post('/signup')
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  signupUser(
    @Body()
    userData: CreateUserDto,
  ) {
    if (userData.password !== userData.confirmPassword) {
      throw new HttpException(
        { status: 401, error: 'invalid credentials' },
        401,
      );
    }
    return this.userService.createUser(userData);
  }

  @Post('/signin')
  signinUser(@Body() userData: LoginUserDto) {
    const res = this.authService.loginAuth(userData);
    if (!res) {
      throw new HttpException(
        { status: 401, error: 'invalid credentials' },
        401,
      );
    }
    return res;
  }
}
