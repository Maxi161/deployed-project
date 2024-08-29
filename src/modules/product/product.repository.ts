import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getProducts(page: number, limit: number) {
    const [products] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return products;
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    return product;
  }

  async createProduct(product: Product) {
    const productCreated = this.productRepository.create(product);
    await this.productRepository.save(productCreated);
    return productCreated.id;
  }

  async createManyProducts(products: Product[]) {
    for (const product of products) {
      const productFound = await this.productRepository.findOne({
        where: { name: product.name },
      });

      if (!productFound) {
        const productCreated = this.productRepository.create(product);
        await this.productRepository.save(productCreated);
      }
    }
    return 'added products';
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (product) {
      await this.productRepository.remove(product);
    }
    return id;
  }

  async updateProduct(
    id: string,
    productData: Partial<Product>,
  ): Promise<Product> {
    await this.productRepository.update(id, productData);
    return this.productRepository.findOne({ where: { id } });
  }
}
