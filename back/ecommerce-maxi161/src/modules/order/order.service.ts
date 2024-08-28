import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../../modules/product/product.repository';
import IOrderDataTransfer from './order.dto';
import { Product } from '../../entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async getOrders() {
    return this.orderRepository.getOrder();
  }

  async addOrder(dataOrder: IOrderDataTransfer) {
    const { userId, products, time } = dataOrder;
    let totalPrice = 0;

    const productEntities: Product[] = [];

    for (const product of products) {
      const productEntity = await this.productRepository.getProductById(
        product.id,
      );
      if (!productEntity || productEntity.stock <= 0) {
        throw new Error(
          `Product with id ${product.id} is out of stock or does not exist`,
        );
      }
      productEntity.stock -= 1;
      totalPrice += Number(productEntity.price);
      productEntities.push(productEntity);
    }

    return this.orderRepository.addOrder(
      userId,
      productEntities,
      time,
      totalPrice,
    );
  }
}
