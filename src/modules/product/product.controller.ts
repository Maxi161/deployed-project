import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../../modules/product/product.service';
import { DataGuard } from '../auth/auth.dataGuard';
import { CategoriesService } from '../category/categories.service';
import IProductDataTransfer from './product.dto';
import { products } from '../../data-products/data-products';
import { TokenGuard } from '../auth/auth.tokenGuard';
import { RoleGuard } from '../auth/auth.roleGuard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(
    @Inject() private readonly categoryService: CategoriesService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  @HttpCode(200)
  async getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return await this.productService.getAllProducts(
      Number(page),
      Number(limit),
    );
  }

  @Get('/seeder')
  @HttpCode(201)
  async createManyProducts() {
    await this.categoryService.addCategories(products);
    const categories = await this.categoryService.getCategories();
    return await this.productService.createManyProducts(categories, products);
  }

  @Post()
  @UseGuards(DataGuard)
  @HttpCode(201)
  async createProduct(@Body() newProduct: IProductDataTransfer) {
    const categories = await this.categoryService.getCategories();
    const id = await this.productService.createProduct(newProduct, categories);
    return `Product ${newProduct.name} was successfully created with id ${id}`;
  }

  @Get(':id')
  @HttpCode(200)
  async getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.productService.getProductById(id);
  }

  @Delete(':id')
  @UseGuards(DataGuard)
  @HttpCode(200)
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.productService.deleteProduct(id);
  }

  @Put(':id')
  @UseGuards(TokenGuard, RoleGuard)
  @HttpCode(200)
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() newProduct: IProductDataTransfer,
  ) {
    await this.categoryService.addCategories([newProduct]);
    return await this.productService.updateProduct(id, newProduct);
  }
}
