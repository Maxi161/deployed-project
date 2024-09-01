import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../../modules/product/product.repository';
import {
  CreateOrderDto,
  OrderDetailsDto,
  OrderResponseDto,
} from '../../dtos/order.dto';
import { Product } from '../../entities/product.entity';
import { Order } from '../../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async getOrders() {
    return this.orderRepository.getOrders();
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.getOrderById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async addOrder(dataOrder: CreateOrderDto) {
    const { userId, products, time } = dataOrder;
    let totalPrice = 0;

    const productEntities: Product[] = [];

    for (const idProduct of products) {
      const productEntity =
        await this.productRepository.getProductById(idProduct);
      if (!productEntity || productEntity.stock <= 0) {
        throw new BadRequestException(
          `Product with ID ${idProduct} is out of stock or does not exist`,
        );
      }
      productEntity.stock -= 1;
      totalPrice += Number(productEntity.price);
      productEntities.push(productEntity);
    }

    const order = await this.orderRepository.addOrder(
      userId,
      productEntities,
      time,
      totalPrice,
    );

    const orderDetails: OrderDetailsDto = {
      id: order.orderDetails.id,
      products: order.orderDetails.products,
      price: order.orderDetails.price,
    };

    const responseOrder: OrderResponseDto = {
      id: order.id,
      date: order.date,
      orderDetails: orderDetails,
    };
    return responseOrder;
  }
}
