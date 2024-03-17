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
  ChannelBulkSchema,
  ChannelCreateSchema,
  ChannelUpdateSchema,
} from '../schemas';
import { ChannelMapper } from '../mappers';
import {
  ChannelBulkModel,
  ChannelCreateModel,
  ChannelGetModel,
  ChannelQueryModel,
  ChannelUpdateModel,
} from '../models';
import { ChannelService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/channels')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(ChannelCreateSchema))
  async create(@Body() body: ChannelCreateModel, @Req() req: Request) {
    try {
      const result = await this.channelService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return ChannelMapper.toChannel(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(ChannelBulkSchema))
  async bulk(@Body() body: ChannelBulkModel, @Req() req: Request) {
    try {
      await this.channelService.bulk(
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
    @Query() query: ChannelGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.channelService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return ChannelMapper.toChannel(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: ChannelQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.channelService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: ChannelMapper.toChannels(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(ChannelUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: ChannelUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.channelService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return ChannelMapper.toChannel(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.channelService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
