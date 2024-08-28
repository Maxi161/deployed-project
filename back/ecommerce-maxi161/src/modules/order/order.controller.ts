import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TimeInterceptor } from '../../interceptors/time.interceptor';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../../dtos/createOrder.dto';
import { TokenGuard } from '../auth/auth.tokenGuard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseInterceptors(TimeInterceptor)
  @UseGuards(TokenGuard)
  @HttpCode(201)
  async createOrder(@Body() DataOrder: CreateOrderDto, time: string) {
    return await this.orderService.addOrder({ ...DataOrder, time });
  }

  @Get('/:id')
  @UseGuards(TokenGuard)
  async getOrderById() {}
}
