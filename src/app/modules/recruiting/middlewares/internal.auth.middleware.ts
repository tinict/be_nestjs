import * as JWT from 'jsonwebtoken';
import { Request } from 'express';

import * as MSG from '../../../../constants/msg';

import { NestMiddleware, Injectable } from '@nestjs/common';
import { ResponseHelper } from '../../../../helpers/response.helper';
import AuthenticationCrypto from './authentication-crypto';

@Injectable()
export class InternalAuthenticationMiddleware implements NestMiddleware {
  async use(req: Request, _res: any, next: () => void) {
    if (!req?.headers?.authorization) {
      throw ResponseHelper.HttpException(
        ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED),
      );
    }
    const authorization = req.headers.authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = JSON.parse(
        AuthenticationCrypto.decrypt(
          JWT.verify(
            authorization,
            process.env.AUTH_SECRET_KEY || 'gce_secrect',
          ),
        ),
      );
    } catch (error) {
      throw ResponseHelper.HttpException(
        ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED),
      );
    }
    if (!payload.user_id) {
      throw ResponseHelper.HttpException(
        ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED),
      );
    }

    req.body.credentials = {
      UserId: payload.user_id,
      OrganizationId: payload.organization_id,
    };

    next();
  }
}
