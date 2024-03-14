import * as JWT from 'jsonwebtoken';

import * as MSG from '../../../../constants/msg';

import { NestMiddleware, Injectable } from '@nestjs/common';
import AuthenticationCrypto from './authentication-crypto';

import { Request } from 'express';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeUserEntity } from 'src/app/modules/identity/entities';
import { ResponseHelper } from 'src/helpers';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(IdeUserEntity)
    private userRepository: Repository<IdeUserEntity>,
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

    const user = await this.userRepository.findOne({
      where: {
        Id: payload.user_id,
        DeleteDate: IsNull(),
      },
    });

    if (!user) {
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
      User: user,
      OrganizationId:
        req.headers['x-organization-id'] || payload?.organization_id,
    };

    next();
  }
}
