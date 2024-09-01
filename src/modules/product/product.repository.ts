import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    try {
      const [products] = await this.productRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      return products;
    } catch (error) {
      throw new Error('Failed to retrieve products');
    }
  }

  async getProductById(id: string): Promise<Product | undefined> {
    try {
      return await this.productRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error('Failed to retrieve product');
    }
  }

  async createProduct(product: Product): Promise<string> {
    try {
      const productCreated = this.productRepository.create(product);
      await this.productRepository.save(productCreated);
      return productCreated.id;
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }

  async createManyProducts(products: Partial<Product>[]): Promise<string> {
    try {
      const result = await this.productRepository.save(products);
      return result.map((prod) => prod.id).join(',');
    } catch (error) {
      throw new Error('Failed to create multiple products');
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    try {
      await this.productRepository.update(id, product);
    } catch (error) {
      throw new Error('Failed to update product');
    }
  }
}
