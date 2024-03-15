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
  CampaignEventBulkSchema,
  CampaignEventCreateSchema,
  CampaignEventUpdateSchema,
} from '../schemas';
import { CampaignEventMapper } from '../mappers';
import {
  CampaignEventBulkModel,
  CampaignEventCreateModel,
  CampaignEventGetModel,
  CampaignEventQueryModel,
  CampaignEventUpdateModel,
} from '../models';
import { CampaignEventService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/campaign-event')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CampaignEventController {
  constructor(
    private readonly campaignEventService: CampaignEventService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CampaignEventCreateSchema))
  async create(@Body() body: CampaignEventCreateModel, @Req() req: Request) {
    try {
      const result = await this.campaignEventService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CampaignEventMapper.toCampaignEvent(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CampaignEventBulkSchema))
  async bulk(@Body() body: CampaignEventBulkModel, @Req() req: Request) {
    try {
      await this.campaignEventService.bulk(
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
    @Query() query: CampaignEventGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignEventService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CampaignEventMapper.toCampaignEvent(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CampaignEventQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.campaignEventService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CampaignEventMapper.toCampaignEvents(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CampaignEventUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CampaignEventUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignEventService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CampaignEventMapper.toCampaignEvent(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.campaignEventService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
