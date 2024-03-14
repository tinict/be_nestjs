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
import { JoiValidationPipe } from '../../../validation';

import {
  CustomFieldTypeBulkSchema,
  CustomFieldTypeCreateSchema,
  CustomFieldTypeUpdateSchema,
} from '../schemas';
import { CustomFieldTypeMapper } from '../mappers';
import {
  CustomFieldTypeBulkModel,
  CustomFieldTypeCreateModel,
  CustomFieldTypeDetailModel,
  CustomFieldTypeQueryModel,
  CustomFieldTypeUpdateModel,
} from '../models';
import { CustomFieldTypeService } from '../services';
import { AuthenticationMiddleware } from '../middlewares';

@ApiTags('COMMON')
@Controller('v1/custom-field-types')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CustomFieldTypeController {
  constructor(
    private readonly customFieldTypeService: CustomFieldTypeService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CustomFieldTypeCreateSchema))
  async create(@Body() body: CustomFieldTypeCreateModel, @Req() req: Request) {
    try {
      const result = await this.customFieldTypeService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CustomFieldTypeMapper.toCustomFieldType(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CustomFieldTypeBulkSchema))
  async bulk(@Body() body: CustomFieldTypeBulkModel, @Req() req: Request) {
    try {
      await this.customFieldTypeService.bulk(
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
    @Query() query: CustomFieldTypeDetailModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.customFieldTypeService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CustomFieldTypeMapper.toCustomFieldType(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CustomFieldTypeQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.customFieldTypeService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CustomFieldTypeMapper.toCustomFieldTypes(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CustomFieldTypeUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CustomFieldTypeUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.customFieldTypeService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CustomFieldTypeMapper.toCustomFieldType(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.customFieldTypeService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
