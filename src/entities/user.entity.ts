import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { v4 as uuid } from 'uuid';
import { Role } from '../decorators/roles.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'users',
})
export class User {
  @ApiProperty({
    description:
      'Unique identifier for the user, automatically generated as a UUID.',
    example: 'b55c13b6-4c2f-43f3-b267-9b19c6d90e70',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({
    description: 'Full name of the user.',
    example: 'John Doe',
  })
  @Column({ length: 50, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Unique email address of the user.',
    example: 'john.doe@example.com',
  })
  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @ApiProperty({
    description: 'Hashed password for the user account.',
    example: '$2b$10$7G0YoJwQMEzXbZTQOe8nN.',
  })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({
    description: 'Role of the user in the system. Defaults to "user".',
    example: 'user',
  })
  @Column({ default: 'user', nullable: false })
  role: Role;

  @ApiProperty({
    description: 'Phone number of the user.',
    example: 1234567890,
  })
  @Column('int', { nullable: true })
  phone: number;

  @ApiProperty({
    description: 'Country where the user resides.',
    example: 'United States',
  })
  @Column({ length: 50, nullable: true })
  country: string;

  @ApiProperty({
    description: 'Residential address of the user.',
    example: '123 Main St, Apt 4B',
  })
  @Column('text', { nullable: true })
  address: string;

  @ApiProperty({
    description: 'City where the user resides.',
    example: 'New York',
  })
  @Column({ length: 50, nullable: true })
  city: string;

  @ApiProperty({
    description: 'Orders associated with the user.',
    type: () => [Order],
  })
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
