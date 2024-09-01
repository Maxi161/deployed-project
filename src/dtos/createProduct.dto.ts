import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  IsPositive,
} from 'class-validator';

@Injectable()
export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product.',
    example: 'Xiaomi Poco 7',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    description: 'Detailed description of the product.',
    example: 'A high-performance smartphone suitable for gaming and work.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Price of the product.',
    example: 999.99,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Number of items available in stock.',
    example: 50,
  })
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty({
    description:
      'URL of the product image. Defaults to a placeholder image if not provided.',
    example:
      'https://res.cloudinary.com/dnhuenhta/image/upload/v1723774544/uaawv9nbh4el9xprom5z.png',
  })
  @IsString()
  @IsOptional()
  imgUrl?: string;

  @ApiProperty({
    description: 'Category ID to which the product belongs.',
    example: 'Smartphone',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
