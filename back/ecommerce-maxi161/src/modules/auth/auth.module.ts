import { Module } from '@nestjs/common';
import { AuthController } from '../../modules/auth/auth.controller';
import { AuthService } from '../../modules/auth/auth.service';
import { UserModule } from '../user/users.module';
import { User } from '../../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from '../order/order.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule, OrderModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
