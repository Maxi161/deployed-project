import { registerAs } from '@nestjs/config';
import { Category } from '../entities/category.entity';
import { Order } from '../entities/order.entity';
import { OrderDetails } from '../entities/orderDetails.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const typeOrmConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Product, Order, OrderDetails, Category],
  synchronize: true,
  logging: ['query', 'error'],
  dropSchema: false,
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => typeOrmConfig);

export const dbConnection = new DataSource(typeOrmConfig as DataSourceOptions);
