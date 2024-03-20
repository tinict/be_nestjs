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
  CampaignPlanBulkSchema,
  CampaignPlanCreateSchema,
  CampaignPlanUpdateSchema,
} from '../schemas';
import { CampaignPlanMapper } from '../mappers';
import {
  CampaignPlanBulkModel,
  CampaignPlanCreateModel,
  CampaignPlanGetModel,
  CampaignPlanQueryModel,
  CampaignPlanUpdateModel,
} from '../models';
import { CampaignPlanService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/campaign-plan')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CampaignPlanController {
  constructor(
    private readonly campaignPlanService: CampaignPlanService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CampaignPlanCreateSchema))
  async create(@Body() body: CampaignPlanCreateModel, @Req() req: Request) {
    try {
      const result = await this.campaignPlanService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CampaignPlanMapper.toCampaignPlan(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CampaignPlanBulkSchema))
  async bulk(@Body() body: CampaignPlanBulkModel, @Req() req: Request) {
    try {
      await this.campaignPlanService.bulk(
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
    @Query() query: CampaignPlanGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignPlanService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CampaignPlanMapper.toCampaignPlan(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CampaignPlanQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.campaignPlanService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CampaignPlanMapper.toCampaignPlans(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CampaignPlanUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CampaignPlanUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignPlanService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CampaignPlanMapper.toCampaignPlan(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.campaignPlanService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
