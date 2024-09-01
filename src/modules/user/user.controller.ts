import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dtos/createUser.dto';
import { ApiTags, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { TokenGuard } from '../auth/auth.tokenGuard';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    example: 5,
  })
  @HttpCode(200)
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    try {
      const usersWithoutPassword = await this.userService.getAllUsers(
        Number(page),
        Number(limit),
      );
      // return usersWithoutPassword;
      return "Que pasa manca \n pone /api en la url";
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @HttpCode(200)
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getUserById(id);
    return user;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @HttpCode(200)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.userService.deleteUser(id);
      return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
      throw new HttpException('Failed to delete user', 500);
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(TokenGuard)
  @HttpCode(200)
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatedUser: Partial<UpdateUserDto>,
  ) {
    const user = await this.userService.updateUser(id, updatedUser);
    return user;
  }
}
