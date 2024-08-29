import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entities/order.entity';
import { OrderDetails } from '../../entities/orderDetails.entity';
import { User } from '../../entities/user.entity';
import { Product } from '../../entities/product.entity';
import { ProductRepository } from '../product/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetails, User, Product])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, ProductRepository],
  exports: [OrderRepository],
})
export class OrderModule {}
