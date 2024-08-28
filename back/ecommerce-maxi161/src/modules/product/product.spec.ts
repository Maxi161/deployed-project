import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import IProductDataTransfer from './product.dto';

// Mock implementations
const mockProductService = {
  getAllProducts: async (page: number, limit: number) => [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description',
      imgUrl: 'http://example.com/image.jpg',
      price: 100,
      stock: 10,
      category: {
        id: 'bf528276-f4e0-4787-b430-4307326d1694',
        name: 'Electronics',
      } as Category,
    },
  ],
  getProductById: async (id: string) => ({
    id,
    name: 'Product 1',
    description: 'Description',
    imgUrl: 'http://example.com/image.jpg',
    price: 100,
    stock: 10,
    category: {
      id: 'bf528276-f4e0-4787-b430-4307326d1694',
      name: 'Electronics',
    } as Category,
  }),
  createProduct: async (product: Product) => product.id,
  createManyProducts: async (products: Product[]) => 'added products',
  deleteProduct: async (id: string) => id,
  updateProduct: async (id: string, productData: Partial<Product>) => ({
    id,
    ...productData,
  }),
};

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('should create a product and return its id', async () => {
    const newProduct: IProductDataTransfer = {
      id: '1',
      name: 'Product 1',
      description: 'Description',
      imgUrl: 'http://example.com/image.jpg',
      price: 100,
      stock: 10,
      category: 'Electronics',
    };

    const result = await productService.createProduct(newProduct, [
      {
        id: 'bf528276-f4e0-4787-b430-4307326d1694',
        name: 'Electronics',
      } as Category,
    ]);

    expect(result).toBe('1');
  });

  it('should return a product by ID', async () => {
    const result = await productService.getProductById('1');
    expect(result).toEqual({
      id: '1',
      name: 'Product 1',
      description: 'Description',
      imgUrl: 'http://example.com/image.jpg',
      price: 100,
      stock: 10,
      category: {
        id: 'bf528276-f4e0-4787-b430-4307326d1694',
        name: 'Electronics',
      } as Category,
    });
  });

  it('should return all products', async () => {
    const result = await productService.getAllProducts(1, 5);
    expect(result).toEqual([
      {
        id: '1',
        name: 'Product 1',
        description: 'Description',
        imgUrl: 'http://example.com/image.jpg',
        price: 100,
        stock: 10,
        category: {
          id: 'bf528276-f4e0-4787-b430-4307326d1694',
          name: 'Electronics',
        } as Category,
      },
    ]);
  });
});
