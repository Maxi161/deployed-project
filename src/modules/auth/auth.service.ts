import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/decorators/roles.enum';

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

  async makeAdmin(id: string, password: string) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new HttpException({ status: 404, error: 'user not found' }, 404);
    }

    if (password === adminPassword) {
      await this.userRepository.updateUser(id, { role: Role.Admin });
      return 'User updated to admin';
    }
    throw new HttpException({ status: 401, error: 'Unauthorized' }, 401);
  }
}
