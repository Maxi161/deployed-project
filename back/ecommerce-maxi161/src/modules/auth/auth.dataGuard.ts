import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

const dataAuth = (req: Request) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return false;
  }

  const [scheme, credentials] = authHeader.split(' ');

  if (scheme !== 'Basic' || !credentials) {
    return false;
  }

  const [email, password] = credentials.split(':');

  if (!email || !password) {
    return false;
  }

  return true;
};

Injectable();
export class DataGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const response = context.switchToHttp().getRequest();
    return dataAuth(response);
  }
}
