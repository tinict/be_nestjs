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
  CustomFieldBulkSchema,
  CustomFieldCreateSchema,
  CustomFieldUpdateSchema,
} from '../schemas';
import { CustomFieldMapper } from '../mappers';
import {
  CustomFieldBulkModel,
  CustomFieldCreateModel,
  CustomFieldDetailModel,
  CustomFieldQueryModel,
  CustomFieldUpdateModel,
} from '../models';
import { CustomFieldService } from '../services';
import { AuthenticationMiddleware } from '../middlewares';

@ApiTags('COMMON')
@Controller('v1/custom-fields')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CustomFieldController {
  constructor(private readonly customFieldService: CustomFieldService) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CustomFieldCreateSchema))
  async create(@Body() body: CustomFieldCreateModel, @Req() req: Request) {
    try {
      const result = await this.customFieldService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CustomFieldMapper.toCustomField(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CustomFieldBulkSchema))
  async bulk(@Body() body: CustomFieldBulkModel, @Req() req: Request) {
    try {
      await this.customFieldService.bulk(
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
    @Query() query: CustomFieldDetailModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.customFieldService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CustomFieldMapper.toCustomField(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CustomFieldQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.customFieldService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CustomFieldMapper.toCustomFields(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CustomFieldUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CustomFieldUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.customFieldService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CustomFieldMapper.toCustomField(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.customFieldService.delete(id, _.get(req, 'body.credentials'));
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
