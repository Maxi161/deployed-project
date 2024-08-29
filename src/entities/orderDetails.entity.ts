import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'order_details',
})
export class OrderDetails {
  @ApiProperty({
    description:
      'Unique identifier for the order details, automatically generated as a UUID.',
    example: 'd7f3a3a4-bc6b-40c2-9d36-f4d1f00f6ecb',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    description: 'Total price for the order details.',
    example: 199.99,
  })
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({
    description: 'The order associated with these details.',
    type: () => Order,
  })
  @OneToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @ApiProperty({
    description: 'List of products included in this order detail.',
    type: () => [Product],
  })
  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable({
    joinColumn: {
      name: 'orderdetails_product',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderdetail_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];
}
