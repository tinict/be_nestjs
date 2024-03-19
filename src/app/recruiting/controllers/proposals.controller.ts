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
  ProposalBulkSchema,
  ProposalCreateSchema,
  ProposalUpdateSchema,
} from '../schemas';
import { ProposalMapper } from '../mappers';
import {
  ProposalBulkModel,
  ProposalCreateModel,
  ProposalGetModel,
  ProposalQueryModel,
  ProposalUpdateModel,
} from '../models';
import { ProposalService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/proposals')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class ProposalController {
  constructor(
    private readonly ProposalService: ProposalService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(ProposalCreateSchema))
  async create(@Body() body: ProposalCreateModel, @Req() req: Request) {
    try {
      const result = await this.ProposalService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return ProposalMapper.toProposal(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(ProposalBulkSchema))
  async bulk(@Body() body: ProposalBulkModel, @Req() req: Request) {
    try {
      await this.ProposalService.bulk(
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
    @Query() query: ProposalGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.ProposalService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return ProposalMapper.toProposal(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: ProposalQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.ProposalService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: ProposalMapper.toProposals(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(ProposalUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: ProposalUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.ProposalService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return ProposalMapper.toProposal(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.ProposalService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
