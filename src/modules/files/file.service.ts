import { HttpException, Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly productsRepository: ProductRepository,
  ) {}

  async updateFileService(id: string, file: Express.Multer.File) {
    const product = await this.productsRepository.getProductById(id);

    if (!product) {
      return new HttpException(
        {
          status: 404,
          error: 'Product not found',
        },
        404,
      );
    }
    const imgResult = new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(result.secure_url);
          }
        },
      );
      toStream(file.buffer).pipe(upload);
    });

    return imgResult
      .then((res) => {
        return this.fileRepository.uploadImage(id, res as string);
      })
      .catch((err) => {
        return new HttpException(
          { status: 500, error: `Cloudinary error: ${err}` },
          500,
        );
      });
  }
}
