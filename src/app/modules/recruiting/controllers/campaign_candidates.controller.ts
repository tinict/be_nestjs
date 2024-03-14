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

import { ResponseHelper } from '../../../../helpers';
import { AuthenticationMiddleware } from '../middlewares/auth.middleware';
import { JoiValidationPipe } from '../../../../validation';

import {
  CampaignCandidateBulkSchema,
  CampaignCandidateCreateSchema,
  CampaignCandidateUpdateSchema,
} from '../schemas';
import { CampaignCandidateMapper } from '../mappers';
import {
  CampaignCandidateBulkModel,
  CampaignCandidateCreateModel,
  CampaignCandidateGetModel,
  CampaignCandidateQueryModel,
  CampaignCandidateUpdateModel,
} from '../models';
import { CampaignCandidateService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/campaign-candidates')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CampaignCandidateController {
  constructor(
    private readonly campaignCandidateService: CampaignCandidateService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CampaignCandidateCreateSchema))
  async create(@Body() body: CampaignCandidateCreateModel, @Req() req: Request) {
    try {
      const result = await this.campaignCandidateService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CampaignCandidateMapper.toCampaignCandidate(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CampaignCandidateBulkSchema))
  async bulk(@Body() body: CampaignCandidateBulkModel, @Req() req: Request) {
    try {
      await this.campaignCandidateService.bulk(
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
    @Query() query: CampaignCandidateGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignCandidateService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CampaignCandidateMapper.toCampaignCandidate(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CampaignCandidateQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.campaignCandidateService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CampaignCandidateMapper.toCampaignCandidates(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CampaignCandidateUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CampaignCandidateUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignCandidateService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CampaignCandidateMapper.toCampaignCandidate(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.campaignCandidateService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
