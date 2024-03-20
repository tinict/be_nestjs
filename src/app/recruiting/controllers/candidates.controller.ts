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
  CandidateBulkSchema,
  CandidateCreateSchema,
  CandidateUpdateSchema,
} from '../schemas';
import { CandidateMapper } from '../mappers';
import {
  CandidateBulkModel,
  CandidateCreateModel,
  CandidateGetModel,
  CandidateQueryModel,
  CandidateUpdateModel,
} from '../models';
import { CandidateService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/candidates')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CandidateController {
  constructor(
    private readonly candidateService: CandidateService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CandidateCreateSchema))
  async create(@Body() body: CandidateCreateModel, @Req() req: Request) {
    try {
      const result = await this.candidateService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CandidateMapper.toCandidate(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CandidateBulkSchema))
  async bulk(@Body() body: CandidateBulkModel, @Req() req: Request) {
    try {
      await this.candidateService.bulk(
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
    @Query() query: CandidateGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CandidateMapper.toCandidate(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CandidateQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.candidateService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CandidateMapper.toCandidates(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CandidateUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CandidateUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CandidateMapper.toCandidate(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.candidateService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
