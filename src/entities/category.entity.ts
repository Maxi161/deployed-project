import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'categories',
})
export class Category {
  @ApiProperty({
    description:
      'Unique identifier for the category, automatically generated as a UUID.',
    example: '2f70b558-88d2-4a4a-8f19-0b4b3b5e9cd9',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    description: 'Name of the category, which is required and must be unique.',
    example: 'Electronics',
  })
  @Column({ length: 50, nullable: false })
  name: string;

  @ApiProperty({
    description: 'List of products associated with this category.',
    type: () => [Product],
  })
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
