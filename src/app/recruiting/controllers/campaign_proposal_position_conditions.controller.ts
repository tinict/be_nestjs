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
  CampaignProposalPositionConditionBulkSchema,
  CampaignProposalPositionConditionCreateSchema,
  CampaignProposalPositionConditionUpdateSchema,
} from '../schemas';
import { CampaignProposalPositionConditionMapper } from '../mappers';
import {
  CampaignProposalPositionConditionBulkModel,
  CampaignProposalPositionConditionCreateModel,
  CampaignProposalPositionConditionGetModel,
  CampaignProposalPositionConditionQueryModel,
  CampaignProposalPositionConditionUpdateModel,
} from '../models';
import { CampaignProposalPositionConditionService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/campaign-proposal-position-condition')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CampaignProposalPositionConditionController {
  constructor(
    private readonly campaignProposalPositionConditionService: CampaignProposalPositionConditionService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CampaignProposalPositionConditionCreateSchema))
  async create(@Body() body: CampaignProposalPositionConditionCreateModel, @Req() req: Request) {
    try {
      const result = await this.campaignProposalPositionConditionService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CampaignProposalPositionConditionMapper.toCampaignProposalPositionCondition(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CampaignProposalPositionConditionBulkSchema))
  async bulk(@Body() body: CampaignProposalPositionConditionBulkModel, @Req() req: Request) {
    try {
      await this.campaignProposalPositionConditionService.bulk(
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
    @Query() query: CampaignProposalPositionConditionGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignProposalPositionConditionService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CampaignProposalPositionConditionMapper.toCampaignProposalPositionCondition(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CampaignProposalPositionConditionQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.campaignProposalPositionConditionService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CampaignProposalPositionConditionMapper.toCampaignProposalPositionConditions(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CampaignProposalPositionConditionUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CampaignProposalPositionConditionUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignProposalPositionConditionService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CampaignProposalPositionConditionMapper.toCampaignProposalPositionCondition(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.campaignProposalPositionConditionService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
