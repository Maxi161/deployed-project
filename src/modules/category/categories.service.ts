import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateProductDto } from 'src/dtos/createProduct.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async addCategories(products: Partial<CreateProductDto>[]) {
    const allCategories = [];

    const categories = products.map((product) => product.category);

    categories.forEach((category) => {
      if (!allCategories.includes(category)) {
        allCategories.push({ name: category });
      }
    });

    return await this.categoriesRepository.addCategories(allCategories);
  }

  async getCategoryByName(name: string) {
    return await this.categoriesRepository.getCategoryByName(name);
  }

  async getCategories() {
    return await this.categoriesRepository.getCategories();
  }
}
