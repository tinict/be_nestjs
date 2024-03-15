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
  CampaignBulkSchema,
  CampaignCreateSchema,
  CampaignUpdateSchema,
} from '../schemas';
import { CampaignMapper } from '../mappers';
import {
  CampaignBulkModel,
  CampaignCreateModel,
  CampaignGetModel,
  CampaignQueryModel,
  CampaignUpdateModel,
} from '../models';
import { CampaignService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/campaign')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CampaignCreateSchema))
  async create(@Body() body: CampaignCreateModel, @Req() req: Request) {
    try {
      const result = await this.campaignService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CampaignMapper.toCampaign(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CampaignBulkSchema))
  async bulk(@Body() body: CampaignBulkModel, @Req() req: Request) {
    try {
      await this.campaignService.bulk(
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
    @Query() query: CampaignGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CampaignMapper.toCampaign(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CampaignQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.campaignService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CampaignMapper.toCampaigns(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CampaignUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CampaignUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CampaignMapper.toCampaign(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.campaignService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
