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

  // Decodificar credentials desde Base64
  const decodedCredentials = Buffer.from(credentials, 'base64').toString(
    'utf-8',
  );
  const [email, password] = decodedCredentials.split(':');

  if (!email || !password) {
    return false;
  }

  // Aquí podrías agregar más lógica de validación si es necesario
  return true;
};

Injectable();
export class DataGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return dataAuth(request);
  }
}
