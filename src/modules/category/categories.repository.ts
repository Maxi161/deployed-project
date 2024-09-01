import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoryDBRepository: Repository<Category>,
  ) {}

  async createCategory(category: Partial<Category>): Promise<Category> {
    const newCategory = this.categoryDBRepository.create(category);
    return await this.categoryDBRepository.save(newCategory);
  }

  async addCategories(categories: Category[]): Promise<Category[]> {
    const savedCategories: Category[] = [];

    for (const category of categories) {
      const existingCategory = await this.categoryDBRepository.findOne({
        where: { name: category.name },
      });

      if (!existingCategory) {
        const newCategory = this.categoryDBRepository.create(category);
        savedCategories.push(await this.categoryDBRepository.save(newCategory));
      }
    }

    return savedCategories;
  }

  async getCategoryByName(name: string): Promise<Category | undefined> {
    return this.categoryDBRepository.findOne({ where: { name } });
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryDBRepository.find();
  }
}
