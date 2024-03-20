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
  CandidateQualificationBulkSchema,
  CandidateQualificationCreateSchema,
  CandidateQualificationUpdateSchema,
} from '../schemas';
import { CandidateQualificationMapper } from '../mappers';
import {
  CandidateQualificationBulkModel,
  CandidateQualificationCreateModel,
  CandidateQualificationGetModel,
  CandidateQualificationQueryModel,
  CandidateQualificationUpdateModel,
} from '../models';
import { CandidateQualificationService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/candidate-qualifications')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CandidateQualificationController {
  constructor(
    private readonly candidateQualificationService: CandidateQualificationService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CandidateQualificationCreateSchema))
  async create(
    @Body() body: CandidateQualificationCreateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateQualificationService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CandidateQualificationMapper.toCandidateQualification(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CandidateQualificationBulkSchema))
  async bulk(@Body() body: CandidateQualificationBulkModel, @Req() req: Request) {
    try {
      await this.candidateQualificationService.bulk(
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
    @Query() query: CandidateQualificationGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateQualificationService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CandidateQualificationMapper.toCandidateQualification(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CandidateQualificationQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.candidateQualificationService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CandidateQualificationMapper.toCandidateQualificationes(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CandidateQualificationUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CandidateQualificationUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateQualificationService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CandidateQualificationMapper.toCandidateQualification(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.candidateQualificationService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
