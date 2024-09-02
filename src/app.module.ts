import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.service';
import { UserModule } from './modules/user/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/products.module';
import { CategoriesModule } from './modules/category/categories.module';
import { DatabaseModule } from './modules/database/database.module';
import { OrderModule } from './modules/order/order.module';
import { FilesModule } from './modules/files/file.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { DataSeederModule } from './modules/data/data.module';
import { DataSeederService } from './modules/data/seeder.data.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    ProductModule,
    CategoriesModule,
    OrderModule,
    FilesModule,
    DataSeederModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [DataSeederService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
