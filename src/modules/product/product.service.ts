import { HttpException, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Category } from '../../entities/category.entity';
import { Product } from '../../entities/product.entity';
import { CategoriesRepository } from '../category/categories.repository';
import { CreateProductDto } from 'src/dtos/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoriesRepository,
  ) {}

  async getProductById(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.getProductById(id);
      if (!product) {
        throw new HttpException('Product not found', 404);
      }
      return product;
    } catch (error) {
      throw new HttpException('Failed to retrieve product', 500);
    }
  }

  async getAllProducts(
    page: number = 1,
    limit: number = 5,
  ): Promise<Product[]> {
    try {
      return await this.productRepository.getProducts(page, limit);
    } catch (error) {
      throw new HttpException('Failed to retrieve products', 500);
    }
  }

  async deleteProduct(id: string): Promise<string> {
    try {
      await this.productRepository.deleteProduct(id);
      return id;
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  }

  async createProduct(
    newProduct: CreateProductDto,
    categories: Category[],
  ): Promise<string> {
    try {
      const {
        description,
        imgUrl,
        name,
        price,
        stock,
        category: categoryName,
      } = newProduct;

      let category = categories.find(
        (cat) => cat.name.toUpperCase() === categoryName.toUpperCase(),
      );

      if (!category) {
        category = await this.categoryRepository.createCategory({
          name: categoryName,
        });
      }

      const product: Product = {
        description,
        imgUrl,
        name,
        price,
        stock,
        category,
      } as Product;

      return await this.productRepository.createProduct(product);
    } catch (error) {
      throw new HttpException('Failed to create product', 500);
    }
  }

  async createManyProducts(
    categories: Category[],
    products: CreateProductDto[],
  ): Promise<string> {
    try {
      const productsWithCategory: Partial<Product>[] = products.map(
        (product) => {
          const {
            description,
            imgUrl,
            name,
            price,
            stock,
            category: categoryName,
          } = product;
          const category = categories.find((cat) => cat.name === categoryName);

          return { description, imgUrl, name, price, stock, category };
        },
      );

      return await this.productRepository.createManyProducts(
        productsWithCategory,
      );
    } catch (error) {
      throw new HttpException('Failed to create multiple products', 500);
    }
  }

  async updateProduct(
    id: string,
    newProduct: Partial<CreateProductDto>,
  ): Promise<Product> {
    try {
      const {
        name,
        description,
        price,
        stock,
        imgUrl,
        category: categoryName,
      } = newProduct;

      const categoryEntity = categoryName
        ? await this.categoryRepository.getCategoryByName(categoryName)
        : undefined;

      const productUpdate: Partial<Product> = {
        name,
        description,
        price,
        stock,
        imgUrl,
        category: categoryEntity,
      };

      await this.productRepository.updateProduct(id, productUpdate);
      return this.productRepository.getProductById(id);
    } catch (error) {
      throw new HttpException('Failed to update product', 500);
    }
  }
}
