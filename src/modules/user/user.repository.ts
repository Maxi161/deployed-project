import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async getUsers(): Promise<User[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const users = await this.userRepository.find();
    return users;
  }

  async getUsersById(id: string) {
    const user: User = await this.userRepository.findOne({ where: { id } });
    const orders: Order[] = await this.orderRepository.find({
      where: { user: user },
    });

    return { user, orders };
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async createUser(newUser: User) {
    const user = this.userRepository.create(newUser);
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(id: string, newData: User) {
    await this.userRepository.update(id, newData);
    return await this.getUsersById(id);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
    return { deleted: true };
  }
}
