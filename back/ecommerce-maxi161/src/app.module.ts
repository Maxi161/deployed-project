import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.service';
import { UserModule } from './modules/user/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/products.module';
import { CategoriesModule } from './modules/category/categories.module';
import { DataBase } from './modules/database/database.module';
import { OrderModule } from './modules/order/order.module';
import { FilesModule } from './modules/files/file.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
  imports: [
    DataBase,
    UserModule,
    AuthModule,
    ProductModule,
    CategoriesModule,
    OrderModule,
    FilesModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
