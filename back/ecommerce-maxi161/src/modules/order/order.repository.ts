import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { OrderDetails } from '../../entities/orderDetails.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(User) private userRespository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getOrder() {
    // Implementar lógica para obtener órdenes si es necesario.
  }

  async addOrder(
    userId: string,
    products: Product[],
    date: string,
    price: number,
  ) {
    products.map((product) => {
      product.stock - 1;
      this.productRepository.update(product.id, product);
    });
    // 1. Buscar al usuario
    const user = await this.userRespository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    // 2. Crear y guardar el pedido principal (Order)
    const order = this.orderRepository.create({ user, date });

    console.log(price);

    // 3. Crear el detalle del pedido (OrderDetails)
    const orderDetails = this.orderDetailsRepository.create({
      order, // Vinculamos el OrderDetails al Order
      price,
      products, // Asumiendo que products está bien como está
    });

    // 4. Guardar el detalle del pedido
    await this.orderDetailsRepository.save(orderDetails);

    // 5. Asignar el detalle del pedido al pedido principal
    order.orderDetails = orderDetails;

    // 6. Guardar el pedido principal actualizado (con los detalles del pedido)
    await this.orderRepository.save(order);

    return order;
  }
}
