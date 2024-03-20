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
  CampaignContactBulkSchema,
  CampaignContactCreateSchema,
  CampaignContactUpdateSchema,
} from '../schemas';
import { CampaignContactMapper } from '../mappers';
import {
  CampaignContactBulkModel,
  CampaignContactCreateModel,
  CampaignContactQueryModel,
  CampaignContactUpdateModel,
} from '../models';
import { CampaignContactService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/campaign-contact')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CampaignContactController {
  constructor(
    private readonly campaignContactService: CampaignContactService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CampaignContactCreateSchema))
  async create(@Body() body: CampaignContactCreateModel, @Req() req: Request) {
    try {
      const result = await this.campaignContactService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CampaignContactMapper.toCampaignContact(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CampaignContactBulkSchema))
  async bulk(@Body() body: CampaignContactBulkModel, @Req() req: Request) {
    try {
      await this.campaignContactService.bulk(
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
    @Query() query: CampaignContactCreateModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignContactService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CampaignContactMapper.toCampaignContact(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CampaignContactQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.campaignContactService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CampaignContactMapper.toCampaignContacts(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CampaignContactUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CampaignContactUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.campaignContactService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CampaignContactMapper.toCampaignContact(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.campaignContactService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
