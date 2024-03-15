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
  CampaignChannelBulkSchema,
  CampaignChannelCreateSchema,
  CampaignChannelUpdateSchema,
} from '../schemas';
import { CampaignChannelMapper } from '../mappers';
import {
  CampaignChannelBulkModel,
  CampaignChannelCreateModel,
  CampaignChannelGetModel,
  CampaignChannelQueryModel,
  CampaignChannelUpdateModel,
} from '../models';
import { CampaignChannelService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/campaign-channel')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CampaignChannelController {
  constructor(
    private readonly campaignChannelService: CampaignChannelService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CampaignChannelCreateSchema))
  async create(@Body() body: CampaignChannelCreateModel, @Req() req: Request) {
    try {
      const result = await this.campaignChannelService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CampaignChannelMapper.toCampaignChannel(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CampaignChannelBulkSchema))
  async bulk(@Body() body: CampaignChannelBulkModel, @Req() req: Request) {
    try {
      await this.campaignChannelService.bulk(
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
    @Query() query: CampaignChannelGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignChannelService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CampaignChannelMapper.toCampaignChannel(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CampaignChannelQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.campaignChannelService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CampaignChannelMapper.toCampaignChannels(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CampaignChannelUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CampaignChannelUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignChannelService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CampaignChannelMapper.toCampaignChannel(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.campaignChannelService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
