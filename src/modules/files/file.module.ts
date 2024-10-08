import { Module } from '@nestjs/common';
import { FilesController } from './file.controller';
import { FileService } from './file.service';
import { FileRepository } from './file.repository';
import { ProductRepository } from '../product/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { cloudinaryService } from '../../config/cloudinaryConfig';
import { UserModule } from '../user/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UserModule],
  controllers: [FilesController],
  providers: [
    FileService,
    cloudinaryService,
    FileRepository,
    ProductRepository,
  ],
})
export class FilesModule {}
