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
    return 'Que onda capo, desde el auth service';
  }
  async loginAuth({ password, email }) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new HttpException({ status: 404, error: 'User not found' }, 404);
    }

    const isValidate = await bcrypt.compare(password, user.password);

    if (!isValidate) {
      throw new HttpException({ status: 401, error: 'unathorized' }, 401);
    }

    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return { message: `User Logued successfully`, token };
  }
}
