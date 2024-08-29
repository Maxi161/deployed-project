import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = currentDate.toLocaleDateString('en-EN', options);

    console.log(
      `\n info Rquest: \n Method: ${req.method} \n URL: ${req.originalUrl} \n Time: ${formattedDate}`,
    );
    next();
  }
}
