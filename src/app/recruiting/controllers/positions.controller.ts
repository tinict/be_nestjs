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
import { AuthenticationMiddleware } from '../middlewares/auth.middleware';
import { JoiValidationPipe } from '../../../validation';

import {
  PositionBulkSchema,
  PositionCreateSchema,
  PositionUpdateSchema,
} from '../schemas';
import { PositionMapper } from '../mappers';
import {
  PositionBulkModel,
  PositionCreateModel,
  PositionGetModel,
  PositionQueryModel,
  PositionUpdateModel,
} from '../models';
import { PositionService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/positions')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class PositionController {
  constructor(
    private readonly positionService: PositionService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(PositionCreateSchema))
  async create(@Body() body: PositionCreateModel, @Req() req: Request) {
    try {
      const result = await this.positionService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return PositionMapper.toPosition(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(PositionBulkSchema))
  async bulk(@Body() body: PositionBulkModel, @Req() req: Request) {
    try {
      await this.positionService.bulk(
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
    @Query() query: PositionGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.positionService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return PositionMapper.toPosition(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: PositionQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.positionService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: PositionMapper.toPositions(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(PositionUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: PositionUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.positionService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return PositionMapper.toPosition(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.positionService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
