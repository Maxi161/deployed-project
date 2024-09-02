import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';
import {
  CreateUserDto,
  LoginUserDto,
  MakeAdminDto,
} from '../../dtos/createUser.dto';
import { UserService } from '../user/user.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

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
  async signupUser(
    @Body()
    userData: CreateUserDto,
  ) {
    if (userData.password !== userData.confirmPassword) {
      throw new HttpException(
        { status: 401, error: 'Invalid credentials' },
        401,
      );
    }
    const { userWithoutPassword } = await this.userService.createUser(userData);
    return userWithoutPassword;
  }

  @Post('/signin')
  @UsePipes(new ValidationPipe())
  async signinUser(@Body() userData: LoginUserDto) {
    const res = await this.authService.loginAuth(userData);
    if (!res) {
      throw new HttpException(
        { status: 401, error: 'Invalid credentials' },
        401,
      );
    }
    return res;
  }

  @Put('/admin/:id')
  @ApiBody({
    description: 'password to make a admin',
    required: true,
    type: MakeAdminDto,
  })
  async makeAdmin(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: MakeAdminDto,
  ) {
    const { password } = data;
    const res = await this.authService.makeAdmin(id, password);
    return res;
  }
}
