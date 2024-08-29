import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { products } from '../../data-products/data-products';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get('seeder')
  async seedCategories() {
    return this.categoriesService.addCategories(products);
  }
}
