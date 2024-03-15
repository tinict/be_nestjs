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
  CandidateEducationBulkSchema,
  CandidateEducationCreateSchema,
  CandidateEducationUpdateSchema,
} from '../schemas';
import { CandidateEducationMapper } from '../mappers';
import {
  CandidateEducationBulkModel,
  CandidateEducationCreateModel,
  CandidateEducationGetModel,
  CandidateEducationQueryModel,
  CandidateEducationUpdateModel,
} from '../models';
import { CandidateEducationService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/candidate-education')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CandidateEducationController {
  constructor(
    private readonly candidateEducationService: CandidateEducationService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CandidateEducationCreateSchema))
  async create(@Body() body: CandidateEducationCreateModel, @Req() req: Request) {
    try {
      const result = await this.candidateEducationService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CandidateEducationMapper.toCandidateEducation(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CandidateEducationBulkSchema))
  async bulk(@Body() body: CandidateEducationBulkModel, @Req() req: Request) {
    try {
      await this.candidateEducationService.bulk(
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
    @Query() query: CandidateEducationGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateEducationService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CandidateEducationMapper.toCandidateEducation(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CandidateEducationQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.candidateEducationService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CandidateEducationMapper.toCandidateEducations(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CandidateEducationUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CandidateEducationUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateEducationService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CandidateEducationMapper.toCandidateEducation(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.candidateEducationService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
