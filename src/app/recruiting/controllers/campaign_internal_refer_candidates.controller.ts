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
  CampaignInternalReferCandidateBulkSchema,
  CampaignInternalReferCandidateCreateSchema,
  CampaignInternalReferCandidateUpdateSchema,
} from '../schemas';
import { CampaignInternalReferCandidateMapper } from '../mappers';
import {
  CampaignInternalReferCandidateBulkModel,
  CampaignInternalReferCandidateCreateModel,
  CampaignInternalReferCandidateGetModel,
  CampaignInternalReferCandidateQueryModel,
  CampaignInternalReferCandidateUpdateModel,
} from '../models';
import { CampaignInternalReferCandidateService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/campaign-internal-refer-candidate')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CampaignInternalReferCandidateController {
  constructor(
    private readonly campaignInternalReferCandidateService: CampaignInternalReferCandidateService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CampaignInternalReferCandidateCreateSchema))
  async create(@Body() body: CampaignInternalReferCandidateCreateModel, @Req() req: Request) {
    try {
      const result = await this.campaignInternalReferCandidateService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CampaignInternalReferCandidateMapper.toCampaignInternalReferCandidate(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CampaignInternalReferCandidateBulkSchema))
  async bulk(@Body() body: CampaignInternalReferCandidateBulkModel, @Req() req: Request) {
    try {
      await this.campaignInternalReferCandidateService.bulk(
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
    @Query() query: CampaignInternalReferCandidateGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignInternalReferCandidateService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CampaignInternalReferCandidateMapper.toCampaignInternalReferCandidate(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CampaignInternalReferCandidateQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.campaignInternalReferCandidateService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CampaignInternalReferCandidateMapper.toCampaignInternalReferCandidates(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CampaignInternalReferCandidateUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CampaignInternalReferCandidateUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignInternalReferCandidateService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CampaignInternalReferCandidateMapper.toCampaignInternalReferCandidate(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.campaignInternalReferCandidateService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
