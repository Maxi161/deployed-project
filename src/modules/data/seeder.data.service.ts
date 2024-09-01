import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { CreateProductDto } from '../../dtos/createProduct.dto';
import { products } from 'src/data-products/data-products';
import { CategoriesService } from '../category/categories.service';

@Injectable()
export class DataSeederService implements OnModuleInit {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoriesService,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  private async seedData() {
    try {
      const existingProducts = await this.productService.getAllProducts();

      if (existingProducts.length === 0) {
        await this.categoryService.addCategories(products);

        const categories = await this.categoryService.getCategories();

        const productsSeeder: CreateProductDto[] = products;

        await this.productService.createManyProducts(
          categories,
          productsSeeder,
        );
      }
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }
}
