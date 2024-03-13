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
  ResourceCustomFieldBulkSchema,
  ResourceCustomFieldCreateSchema,
  ResourceCustomFieldUpdateSchema,
} from '../schemas';
import { ResourceCustomFieldMapper } from '../mappers';
import {
  ResourceCustomFieldBulkModel,
  ResourceCustomFieldCreateModel,
  ResourceCustomFieldDetailModel,
  ResourceCustomFieldQueryModel,
  ResourceCustomFieldUpdateModel,
} from '../models';
import { ResourceCustomFieldService } from '../services';

@ApiTags('COMMON')
@Controller('v1/resource-custom-fields')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class ResourceCustomFieldController {
  constructor(
    private readonly resourceCustomFieldService: ResourceCustomFieldService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(ResourceCustomFieldCreateSchema))
  async create(
    @Body() body: ResourceCustomFieldCreateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.resourceCustomFieldService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return ResourceCustomFieldMapper.toResourceCustomField(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(ResourceCustomFieldBulkSchema))
  async bulk(@Body() body: ResourceCustomFieldBulkModel, @Req() req: Request) {
    try {
      await this.resourceCustomFieldService.bulk(
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
    @Query() query: ResourceCustomFieldDetailModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.resourceCustomFieldService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return ResourceCustomFieldMapper.toResourceCustomField(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(
    @Query() query: ResourceCustomFieldQueryModel,
    @Req() req: Request,
  ) {
    try {
      const { rows, paging } = await this.resourceCustomFieldService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: ResourceCustomFieldMapper.toResourceCustomFields(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(ResourceCustomFieldUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: ResourceCustomFieldUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.resourceCustomFieldService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return ResourceCustomFieldMapper.toResourceCustomField(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.resourceCustomFieldService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
