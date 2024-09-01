import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { DataGuard } from '../auth/auth.dataGuard';
import { CategoriesService } from '../category/categories.service';
import { TokenGuard } from '../auth/auth.tokenGuard';
import { RoleGuard } from '../auth/auth.roleGuard';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from 'src/dtos/createProduct.dto';
import { Role } from 'src/decorators/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(
    @Inject() private readonly categoryService: CategoriesService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    example: 5,
  })
  @HttpCode(200)
  async getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    try {
      return await this.productService.getAllProducts(
        Number(page),
        Number(limit),
      );
    } catch (error) {
      throw new HttpException('Failed to retrieve products', 500);
    }
  }

  @Post()
  @ApiBasicAuth()
  @UseGuards(DataGuard)
  @HttpCode(201)
  async createProduct(@Body() newProduct: CreateProductDto) {
    try {
      const categories = await this.categoryService.getCategories();
      const id = await this.productService.createProduct(
        newProduct,
        categories,
      );
      return `Product ${newProduct.name} was successfully created with id ${id}`;
    } catch (error) {
      throw new HttpException('Failed to create product', 500);
    }
  }

  @Get(':id')
  @HttpCode(200)
  async getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const product = await this.productService.getProductById(id);
      if (!product) {
        throw new HttpException('Product not found', 404);
      }
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  @UseGuards(DataGuard)
  @HttpCode(200)
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.productService.deleteProduct(id);
      return { message: `Product with id ${id} deleted successfully` };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @Put(':id')
  @Roles(Role.User)
  @ApiBearerAuth()
  @ApiBody({ type: CreateProductDto })
  @UseGuards(TokenGuard, RoleGuard)
  @HttpCode(200)
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() newProduct: Partial<CreateProductDto>,
  ) {
    await this.categoryService.addCategories([newProduct]);
    const updatedProduct = await this.productService.updateProduct(
      id,
      newProduct,
    );
    if (!updatedProduct) {
      throw new HttpException('Product not found', 404);
    }
    return updatedProduct;
  }
}
