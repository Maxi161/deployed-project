import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async uploadImage(id: string, urlImage: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    product.imgUrl = urlImage;
    this.productRepository.update(id, product);

    return product;
  }
}
