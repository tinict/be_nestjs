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

import { ResponseHelper } from '../../../helpers';
import { AuthenticationMiddleware } from '../../../middlewares/auth.middleware';
import { JoiValidationPipe } from '../../../validation';

import {
  CustomFieldValueBulkSchema,
  CustomFieldValueCreateSchema,
  CustomFieldValueUpdateSchema,
} from '../schemas';
import { CustomFieldValueMapper } from '../mappers';
import {
  CustomFieldValueBulkModel,
  CustomFieldValueCreateModel,
  CustomFieldValueDetailModel,
  CustomFieldValueQueryModel,
  CustomFieldValueUpdateModel,
} from '../models';
import { CustomFieldValueService } from '../services';

@ApiTags('COMMON')
@Controller('v1/custom-field-values')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CustomFieldValueController {
  constructor(
    private readonly customFieldValueService: CustomFieldValueService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CustomFieldValueCreateSchema))
  async create(@Body() body: CustomFieldValueCreateModel, @Req() req: Request) {
    try {
      const result = await this.customFieldValueService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CustomFieldValueMapper.toCustomFieldValue(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CustomFieldValueBulkSchema))
  async bulk(@Body() body: CustomFieldValueBulkModel, @Req() req: Request) {
    try {
      await this.customFieldValueService.bulk(
        body.items,
        _.get(req, 'body.credentials'),
      );

      return ResponseHelper.Ok();
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get(':id')
  async get(
    @Query() query: CustomFieldValueDetailModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.customFieldValueService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CustomFieldValueMapper.toCustomFieldValue(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CustomFieldValueQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.customFieldValueService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CustomFieldValueMapper.toCustomFieldValues(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CustomFieldValueUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CustomFieldValueUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.customFieldValueService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CustomFieldValueMapper.toCustomFieldValue(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.customFieldValueService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
