import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../decorators/roles.enum';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const token = request.headers['authorization']?.split(' ')[1] ?? '';
      if (!token) {
        throw new HttpException({ status: 401, error: 'Unauthorized' }, 401);
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      if (!payload) {
        throw new HttpException(
          { status: 401, error: 'Unauthorized token' },
          401,
        );
      }

      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      payload.role = [Role.User];
      request.user = payload;

      return true;
    } catch (err) {
      throw new HttpException({ status: 500, error: err }, 500);
    }
  }
}
