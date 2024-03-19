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
  EventBulkSchema,
  EventCreateSchema,
  EventUpdateSchema,
} from '../schemas';
import { EventMapper } from '../mappers';
import {
  EventBulkModel,
  EventCreateModel,
  EventGetModel,
  EventQueryModel,
  EventUpdateModel,
} from '../models';
import { EventService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/events')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class EventController {
  constructor(
    private readonly eventService: EventService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(EventCreateSchema))
  async create(@Body() body: EventCreateModel, @Req() req: Request) {
    try {
      const result = await this.eventService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return EventMapper.toEvent(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(EventBulkSchema))
  async bulk(@Body() body: EventBulkModel, @Req() req: Request) {
    try {
      await this.eventService.bulk(
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
    @Query() query: EventGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.eventService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return EventMapper.toEvent(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: EventQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.eventService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: EventMapper.toEvents(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(EventUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: EventUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.eventService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return EventMapper.toEvent(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.eventService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
