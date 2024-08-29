import { IsUUID, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { Product } from '../entities/product.entity';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  products: Partial<Product[]>;
}
