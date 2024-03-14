import * as _ from 'lodash';

import { Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ResponseHelper } from 'src/helpers/response.helper';
import { JoiValidationPipe } from 'src/validation';

import { UserService } from '../services';
import {
  UserVerifySchema,
  UserCreateSchema,
  UserUpdateSchema,
  UserUpdatePasswordSchema,
  UserUpdatePhoneSchema,
} from '../schemas';
import { UserMapper } from '../mappers';
import {
  UserVerifyModel,
  UserCreateModel,
  UserQueryModel,
  UserUpdateModel,
  UserDetailModel,
  UserUpdatePasswordModel,
  UserUpdatePhoneModel,
} from '../models';
import { AuthenticationMiddleware } from '../middlewares';

@ApiTags('Identity')
@Controller('v1/users')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(UserCreateSchema))
  async create(@Body() body: UserCreateModel, @Req() req: Request) {
    try {
      const result = await this.userService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return UserMapper.toUser(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Get(':id')
  async get(
    @Param('id') id: string,
    @Query() query: UserDetailModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.userService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return UserMapper.toUser(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: UserQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.userService.getAll(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: UserMapper.toRawUsers(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(UserUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: UserUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.userService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );
      return UserMapper.toUser(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id/check-password')
  @UsePipes(new JoiValidationPipe(UserUpdatePasswordSchema))
  async changePassword(
    @Param('id') id: string,
    @Body() body: UserUpdatePasswordModel,
    @Req() req: Request,
  ) {
    try {
      await this.userService.changePassword(
        id,
        body,
        _.get(req, 'body.credentials'),
      );
      return ResponseHelper.noContent();
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id/change-phone')
  @UsePipes(new JoiValidationPipe(UserUpdatePhoneSchema))
  async changePhone(
    @Param('id') id: string,
    @Body() body: UserUpdatePhoneModel,
    @Req() req: Request,
  ) {
    try {
      await this.userService.changePhone(
        id,
        body,
        _.get(req, 'body.credentials'),
      );
      return ResponseHelper.noContent();
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Post('verify')
  @UsePipes(new JoiValidationPipe(UserVerifySchema))
  async verify(@Body() body: UserVerifyModel, @Req() req: Request) {
    try {
      await this.userService.verify(body, _.get(req, 'body.credentials'));
      return ResponseHelper.noContent();
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.userService.delete(id, _.get(req, 'body.credentials'));

      return ResponseHelper.noContent();
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
