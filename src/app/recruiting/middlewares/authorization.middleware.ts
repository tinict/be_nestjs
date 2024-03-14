import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  async use(req: Request, _res: any, next: () => void) {
    next();
  }
}
