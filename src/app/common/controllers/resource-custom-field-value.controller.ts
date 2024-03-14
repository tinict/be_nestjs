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
  ResourceCustomFieldValueBulkSchema,
  ResourceCustomFieldValueCreateSchema,
  ResourceCustomFieldValueUpdateSchema,
} from '../schemas';
import { ResourceCustomFieldValueMapper } from '../mappers';
import {
  ResourceCustomFieldValueBulkModel,
  ResourceCustomFieldValueCreateModel,
  ResourceCustomFieldValueDetailModel,
  ResourceCustomFieldValueQueryModel,
  ResourceCustomFieldValueUpdateModel,
} from '../models';
import { ResourceCustomFieldValueService } from '../services';
import { AuthenticationMiddleware } from '../middlewares';

@ApiTags('COMMON')
@Controller('v1/resource-custom-field-values')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class ResourceCustomFieldValueController {
  constructor(
    private readonly resourceCustomFieldValueService: ResourceCustomFieldValueService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(ResourceCustomFieldValueCreateSchema))
  async create(
    @Body() body: ResourceCustomFieldValueCreateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.resourceCustomFieldValueService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return ResourceCustomFieldValueMapper.toResourceCustomFieldValue(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(ResourceCustomFieldValueBulkSchema))
  async bulk(
    @Body() body: ResourceCustomFieldValueBulkModel,
    @Req() req: Request,
  ) {
    try {
      await this.resourceCustomFieldValueService.bulk(
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
    @Query() query: ResourceCustomFieldValueDetailModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.resourceCustomFieldValueService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return ResourceCustomFieldValueMapper.toResourceCustomFieldValue(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(
    @Query() query: ResourceCustomFieldValueQueryModel,
    @Req() req: Request,
  ) {
    try {
      const { rows, paging } = await this.resourceCustomFieldValueService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: ResourceCustomFieldValueMapper.toResourceCustomFieldValues(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(ResourceCustomFieldValueUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: ResourceCustomFieldValueUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.resourceCustomFieldValueService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return ResourceCustomFieldValueMapper.toResourceCustomFieldValue(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.resourceCustomFieldValueService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
