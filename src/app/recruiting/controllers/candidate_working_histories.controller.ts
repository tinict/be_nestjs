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
  CandidateWorkingHistoryBulkSchema,
  CandidateWorkingHistoryCreateSchema,
  CandidateWorkingHistoryUpdateSchema,
} from '../schemas';
import { CandidateWorkingHistoryMapper } from '../mappers';
import {
  CandidateWorkingHistoryBulkModel,
  CandidateWorkingHistoryCreateModel,
  CandidateWorkingHistoryGetModel,
  CandidateWorkingHistoryQueryModel,
  CandidateWorkingHistoryUpdateModel,
} from '../models';
import { CandidateWorkingHistoryService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/candidate-working-histories')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CandidateWorkingHistoryController {
  constructor(
    private readonly candidateWorkingHistoryService: CandidateWorkingHistoryService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CandidateWorkingHistoryCreateSchema))
  async create(
    @Body() body: CandidateWorkingHistoryCreateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateWorkingHistoryService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CandidateWorkingHistoryMapper.toCandidateWorkingHistory(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CandidateWorkingHistoryBulkSchema))
  async bulk(@Body() body: CandidateWorkingHistoryBulkModel, @Req() req: Request) {
    try {
      await this.candidateWorkingHistoryService.bulk(
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
    @Query() query: CandidateWorkingHistoryGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateWorkingHistoryService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CandidateWorkingHistoryMapper.toCandidateWorkingHistory(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CandidateWorkingHistoryQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.candidateWorkingHistoryService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CandidateWorkingHistoryMapper.toCandidateWorkingHistoryes(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CandidateWorkingHistoryUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CandidateWorkingHistoryUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateWorkingHistoryService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CandidateWorkingHistoryMapper.toCandidateWorkingHistory(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.candidateWorkingHistoryService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
