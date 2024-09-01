import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  userAuth() {
    return 'Authentication service is working';
  }

  async loginAuth({ password, email }) {
    const user = await this.userRepository.getUserByEmail(email);
    console.log(user);

    if (!user) {
      throw new HttpException({ status: 404, error: 'User not found' }, 404);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new HttpException({ status: 401, error: 'Unauthorized' }, 401);
    }

    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return { message: 'User logged in successfully', token };
  }
}
