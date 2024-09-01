import { Injectable, HttpException } from '@nestjs/common';
import { UserRepository } from './user.repository'; // Ruta actualizada
import { User } from '../../entities/user.entity';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { OrderRepository } from '../order/order.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly orderRespository: OrderRepository,
  ) {}

  async getAllUsers(page: number = 1, limit: number = 5) {
    try {
      const users = await this.userRepository.getUsers(page, limit);

      return users.map((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, role, ...userWithoutPassword } = user;
        const userData = userWithoutPassword;
        return userData;
      });
    } catch (error) {
      throw new Error('Failed to retrieve users');
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.getUserById(id);

      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
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
    const { password, role, ...userWithoutPassword } = newUser;
    return { password, role, userWithoutPassword };
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.userRepository.deleteUser(id);
    } catch (error) {
      throw new HttpException('Failed to delete user', 500);
    }
  }

  async updateUser(id: string, updatedUser: Partial<User>): Promise<User> {
    try {
      await this.userRepository.updateUser(id, updatedUser);
      const updated = await this.userRepository.getUserById(id);
      if (!updated) {
        throw new Error('User not found');
      }
      return updated;
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }
}
