import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number): Promise<User[]> {
    try {
      const [users] = await this.userRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      return users;
    } catch (error) {
      throw new Error('Failed to retrieve users');
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user: User = await this.userRepository.findOne({
        where: { email },
      });
      return user;
    } catch (err) {
      throw new Error('Error getting user by email');
    }
  }

  async getUserById(id: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({
        where: { id },
        relations: ['orders'],
      });
    } catch (error) {
      throw new Error('Failed to retrieve user');
    }
  }

  async createUser(user: User) {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }

  async updateUser(id: string, user: Partial<User>): Promise<void> {
    try {
      await this.userRepository.update(id, user);
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }
}
