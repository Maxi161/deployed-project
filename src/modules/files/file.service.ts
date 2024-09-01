import { HttpException, Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { v2 as cloudinary } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async updateFileService(id: string, file: Express.Multer.File) {
    const product = await this.productRepository.getProductById(id);

    if (!product) {
      throw new HttpException('Product not found', 404);
    }

    try {
      const result = await this.uploadImageToCloudinary(file);
      return this.fileRepository.uploadImage(id, result);
    } catch (err) {
      throw new HttpException(`Cloudinary error: ${err.message}`, 500);
    }
  }

  private uploadImageToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        },
      );
      toStream(file.buffer).pipe(uploadStream);
    });
  }
}
