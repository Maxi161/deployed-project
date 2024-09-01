import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { OrderDetails } from '../../entities/orderDetails.entity';
import { User } from '../../entities/user.entity';
import { Product } from '../../entities/product.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getOrders() {
    return this.orderRepository.find({
      relations: ['orderDetails', 'orderDetails.products'],
    });
  }

  async getOrderById(id: string) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.products'],
    });
  }

  async addOrder(
    userId: string,
    products: Product[],
    date: string,
    price: number,
  ) {
    for (const product of products) {
      await this.productRepository.update(product.id, { stock: product.stock });
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const order = this.orderRepository.create({ user, date });
    const savedOrder = await this.orderRepository.save(order);

    const orderDetails = this.orderDetailsRepository.create({
      order: savedOrder,
      price,
      products,
    });
    await this.orderDetailsRepository.save(orderDetails);

    savedOrder.orderDetails = orderDetails;
    return this.orderRepository.save(savedOrder);
  }
}
