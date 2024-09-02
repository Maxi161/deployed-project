import { Module } from '@nestjs/common';
import { DataSeederService } from './seeder.data.service';
import { ProductService } from '../product/product.service';
import { CategoriesService } from '../category/categories.service';
import { ProductModule } from '../product/products.module';
import { CategoriesModule } from '../category/categories.module';

@Module({
  imports: [ProductModule, CategoriesModule],
  providers: [DataSeederService, ProductService, CategoriesService],
})
export class DataSeederModule {}
