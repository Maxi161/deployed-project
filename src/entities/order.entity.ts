import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { OrderDetails } from './orderDetails.entity';
import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'orders',
})
export class Order {
  @ApiProperty({
    description:
      'Unique identifier for the order, automatically generated as a UUID.',
    example: '4a1c91e8-3b7e-4b69-bf59-5d2f4b4b5a7f',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    description: 'The user who placed the order.',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({
    description: 'The date when the order was placed.',
    example: '2024-08-25',
  })
  @Column()
  date: string;

  @ApiProperty({
    description: 'Details of the order, including products and pricing.',
    type: () => OrderDetails,
  })
  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order, {
    cascade: true,
  })
  @JoinColumn({ name: 'order_id' })
  orderDetails?: OrderDetails;
}
