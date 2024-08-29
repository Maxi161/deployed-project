import { HttpException, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import IProductDataTransfer from './product.dto';
import { Category } from '../../entities/category.entity';
import { Product } from '../../entities/product.entity';
import { CategoriesRepository } from '../category/categories.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoriesRepository,
  ) {}

  async getProductById(id: string) {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new HttpException({ status: 404, error: 'Product not found' }, 404);
    }
    return product;
  }

  async getAllProducts(page: number = 1, limit: number = 5) {
    return await this.productRepository.getProducts(page, limit);
  }

  async deleteProduct(id: string) {
    return await this.productRepository.deleteProduct(id);
  }

  async createProduct(
    newProduct: IProductDataTransfer,
    categories: Category[],
  ) {
    const {
      id,
      description,
      imgUrl,
      name,
      price,
      stock,
      category: categoryName,
    } = newProduct;

    const category = categories.find((cat) => cat.name === categoryName);

    const product: Product = {
      id,
      description,
      imgUrl,
      name,
      price,
      stock,
      category,
    } as Product;

    return await this.productRepository.createProduct(product);
  }

  async createManyProducts(
    categories: Category[],
    products: IProductDataTransfer[],
  ) {
    const productsWithCategory: Product[] = [];
    products.forEach((product) => {
      console.log(categories);
      const { description, imgUrl, name, price, stock, id } = product;
      const props = { description, imgUrl, name, price, stock, id };
      const category = categories.find(
        (category) => category.name === product.category,
      );

      productsWithCategory.push({ ...props, category });
    });
    return await this.productRepository.createManyProducts(
      productsWithCategory,
    );
  }

  async updateProduct(id: string, newProduct: IProductDataTransfer) {
    const { name, description, price, stock, imgUrl, category } = newProduct;

    const categoryEntity =
      await this.categoryRepository.getCategoryByName(category);

    const productUpdate: Partial<Product> = {
      name,
      description,
      price,
      stock,
      imgUrl,
      category: categoryEntity,
    };

    return this.productRepository.updateProduct(id, productUpdate);
  }
}
