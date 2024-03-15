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
  CandidateInterviewProcessBulkSchema,
  CandidateInterviewProcessCreateSchema,
  CandidateInterviewProcessUpdateSchema,
} from '../schemas';
import { CandidateInterviewProcessMapper } from '../mappers';
import {
  CandidateInterviewProcessBulkModel,
  CandidateInterviewProcessCreateModel,
  CandidateInterviewProcessGetModel,
  CandidateInterviewProcessQueryModel,
  CandidateInterviewProcessUpdateModel,
} from '../models';
import { CandidateInterviewProcessService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/candidate-interview-processes')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CandidateInterviewProcessController {
  constructor(
    private readonly candidateInterviewProcessService: CandidateInterviewProcessService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CandidateInterviewProcessCreateSchema))
  async create(
    @Body() body: CandidateInterviewProcessCreateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateInterviewProcessService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CandidateInterviewProcessMapper.toCandidateInterviewProcess(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CandidateInterviewProcessBulkSchema))
  async bulk(@Body() body: CandidateInterviewProcessBulkModel, @Req() req: Request) {
    try {
      await this.candidateInterviewProcessService.bulk(
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
    @Query() query: CandidateInterviewProcessGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateInterviewProcessService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CandidateInterviewProcessMapper.toCandidateInterviewProcess(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CandidateInterviewProcessQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.candidateInterviewProcessService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CandidateInterviewProcessMapper.toCandidateInterviewProcesses(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CandidateInterviewProcessUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CandidateInterviewProcessUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateInterviewProcessService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CandidateInterviewProcessMapper.toCandidateInterviewProcess(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.candidateInterviewProcessService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
