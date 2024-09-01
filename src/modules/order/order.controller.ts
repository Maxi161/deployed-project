import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { TimeInterceptor } from '../../interceptors/time.interceptor';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../../dtos/order.dto';
import { TokenGuard } from '../auth/auth.tokenGuard';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBody({ type: CreateOrderDto })
  @ApiBearerAuth()
  @UseInterceptors(TimeInterceptor)
  @UseGuards(TokenGuard)
  @HttpCode(201)
  async createOrder(
    @Body() dataOrder: Omit<CreateOrderDto, 'time'>,
    @Body('time') time: string,
  ) {
    try {
      const newDataOrder: CreateOrderDto = { ...dataOrder, time };
      return await this.orderService.addOrder(newDataOrder);
    } catch (error) {
      throw new HttpException({ status: 500, error: error.message }, 500);
    }
  }

  @Get('/:id')
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  async getOrderById(@Param('id') id: string) {
    const order = await this.orderService.getOrderById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }
}
