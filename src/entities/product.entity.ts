import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { OrderDetails } from './orderDetails.entity';
import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

// const imgDefault =
//   'https://res.cloudinary.com/dnhuenhta/image/upload/v1723774544/uaawv9nbh4el9xprom5z.png';

const imgDefault = 'img default';

@Entity({
  name: 'products',
})
export class Product {
  @ApiProperty({
    description:
      'Unique identifier for the product, automatically generated as a UUID.',
    example: 'e17d7e82-b4d6-4c2e-9e1f-df5d5a243e30',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    description: 'Name of the product.',
    example: 'Laptop',
  })
  @Column({ length: 50, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the product.',
    example: 'A high-performance laptop suitable for gaming and work.',
  })
  @Column('text', { nullable: false })
  description: string;

  @ApiProperty({
    description: 'Price of the product.',
    example: 999.99,
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @ApiProperty({
    description: 'Number of items available in stock.',
    example: 50,
  })
  @Column({ type: 'int', nullable: false })
  stock: number;

  @ApiProperty({
    description:
      'URL of the product image. Defaults to a placeholder image if not provided.',
    example: imgDefault,
  })
  @Column({ default: imgDefault })
  imgUrl: string;

  @ApiProperty({
    description: 'Category to which the product belongs.',
    type: () => Category,
  })
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ApiProperty({
    description: 'Details of orders that include this product.',
    type: () => [OrderDetails],
  })
  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails?: OrderDetails[];
}
