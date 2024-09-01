import {
  IsUUID,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/entities/product.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'UUID of the user making the order',
    type: String,
    example: 'e1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Array of UUIDs representing the products in the order',
    type: [String],
    example: [
      'a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6',
      'b1c2d3e4-f5a6-7b8c-9d0e-f1a2b3c4d5e6',
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  products: string[];

  @ApiHideProperty()
  @IsNotEmpty()
  time: string;
}

export class OrderDetailsDto {
  @ApiProperty({
    description: 'UUID of the order details',
    type: String,
    example: '9f27ae77-9dc0-47a0-a8ac-a4d1c9e5b02d',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'List of products included in this order detail',
    type: [Product],
  })
  @IsArray()
  @IsNotEmpty()
  products: Product[];

  @ApiProperty({
    description: 'Total price of the order details',
    type: Number,
    example: 479.88,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class OrderResponseDto {
  @ApiProperty({
    description: 'UUID of the order',
    type: String,
    example: '8778b766-774f-4833-80aa-275849fe1ea0',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Date when the order was placed',
    type: String,
    example: '01/09/2024',
  })
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Details of the order',
    type: OrderDetailsDto,
  })
  @IsNotEmpty()
  orderDetails: OrderDetailsDto;
}
