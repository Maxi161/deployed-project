import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { CategoriesService } from '../category/categories.service';
import { CategoriesModule } from '../category/categories.module';
import { Product } from '../../entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule, UserModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, CategoriesService],
  exports: [ProductRepository, ProductService],
})
export class ProductModule {}
