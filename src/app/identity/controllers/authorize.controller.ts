import * as _ from 'lodash';

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseHelper } from '../../../helpers/response.helper';
import { AuthenticationService } from '../services/authentication.service';
import { Request } from 'express';
import { UserMapper } from '../mappers/user.mapper';
import { ChangePasswordModel } from '../models';
import { AuthenticationMiddleware } from '../middlewares';

@ApiTags('Identity')
@Controller('v1/auth')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class AuthorizeController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('me')
  async me(@Req() req: Request) {
    try {
      const result = await this.authenticationService.me(
        _.get(req, 'body.credentials'),
      );

      return UserMapper.toUser(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('change-password')
  async changePassword(
    @Body() model: ChangePasswordModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.authenticationService.changePassword(
        model,
        _.get(req, 'body.credentials'),
      );

      return UserMapper.toUser(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

}
