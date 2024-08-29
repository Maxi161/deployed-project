import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import IUserDataTransfer from './user.dto';
import { TokenGuard } from '../auth/auth.tokenGuard';
import { RoleGuard } from '../auth/auth.roleGuard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../decorators/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.User)
  @UseGuards(TokenGuard, RoleGuard)
  @HttpCode(200)
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return await this.userService.getAllUsers(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @HttpCode(200)
  getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() userData: Partial<User>,
  ) {
    this.userService.updateUser(id, userData);
    return `User with id ${id} was updated`;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    this.userService.deleteUser(id);
    return `User with id ${id} was deleted`;
  }
}
