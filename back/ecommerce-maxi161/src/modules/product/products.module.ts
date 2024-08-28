import { Module } from '@nestjs/common';
import { ProductController } from '../../modules/product/product.controller';
import { ProductService } from '../../modules/product/product.service';
import { ProductRepository } from './product.repository';
import { CategoriesService } from '../category/categories.service';
import { CategoriesModule } from '../category/categories.module';
import { Product } from '../../entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, CategoriesService],
  exports: [ProductRepository],
})
export class ProductModule {}
