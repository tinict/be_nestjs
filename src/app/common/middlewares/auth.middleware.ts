import * as JWT from 'jsonwebtoken';

import * as MSG from '../../../constants/msg';

import { NestMiddleware, Injectable } from '@nestjs/common';
import { ResponseHelper } from '../../../helpers/response.helper';
import AuthenticationCrypto from './authentication-crypto';

import { Request } from 'express';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonUserEntity } from '../entities';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
  ) {}

  async use(req: Request, _res: any, next: () => void) {
    if (!req?.headers?.authorization) {
      throw ResponseHelper.HttpException(
        ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED),
      );
    }

    const authorization = (
      req?.headers?.authorization?.toString() || ''
    ).replace('Bearer ', '');

    let payload;
    if (authorization) {
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
    }

    if (!payload?.user_id) {
      throw ResponseHelper.HttpException(
        ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED),
      );
    }

    
    // if (payload.exp > new Date().getTime()) {
    //   throw ResponseHelper.HttpException(
    //     ResponseHelper.UnAuthorized(MSG.MSG_AUTH_HAS_EXPIRED),
    //   );
    // }

    req.body.credentials = {
      UserId: payload?.user_id,
      OrganizationId:
        req.headers['x-organization-id'] || payload?.organization_id,
    };

    next();
  }
}
