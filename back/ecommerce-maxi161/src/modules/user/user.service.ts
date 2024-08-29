import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from '../../dtos/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const users = await this.userRepository.getUsers();

    const paginatedUsers = users.slice(startIndex, endIndex);

    return paginatedUsers.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, role, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async getUserById(id: string) {
    const { user, orders } = await this.userRepository.getUsersById(id);
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return { userWithoutPassword, orders };
    }
    return new HttpException({ status: 404, error: 'User not found.' }, 404);
  }

  async createUser(userData: CreateUserDto) {
    const userFound = await this.userRepository.getUserByEmail(userData.email);

    if (userFound) {
      throw new HttpException(
        { status: 400, error: 'email alredy in use' },
        400,
      );
    }

    const hashedPassword = await bcrypt.hash(userData.password, 11);

    if (!hashedPassword) {
      throw new HttpException(
        { status: 400, error: 'password could not be hashed' },
        500,
      );
    }

    const user = new User();
    user.name = userData.name;
    user.address = userData.address;
    user.city = userData.city;
    user.country = userData.country;
    user.email = userData.email;
    user.password = hashedPassword;
    user.phone = userData.phone;

    const newUser = await this.userRepository.createUser(user as User);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async updateUser(id: string, newData: Partial<User>) {
    return await this.userRepository.updateUser(id, newData as User);
  }

  async deleteUser(id: string) {
    return await this.userRepository.deleteUser(id);
  }
}
