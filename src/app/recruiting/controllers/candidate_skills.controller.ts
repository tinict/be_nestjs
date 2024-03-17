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
  CandidateSkillBulkSchema,
  CandidateSkillCreateSchema,
  CandidateSkillUpdateSchema,
} from '../schemas';
import { CandidateSkillMapper } from '../mappers';
import {
  CandidateSkillBulkModel,
  CandidateSkillCreateModel,
  CandidateSkillGetModel,
  CandidateSkillQueryModel,
  CandidateSkillUpdateModel,
} from '../models';
import { CandidateSkillService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/candidate-skills')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CandidateSkillController {
  constructor(
    private readonly candidateSkillService: CandidateSkillService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CandidateSkillCreateSchema))
  async create(
    @Body() body: CandidateSkillCreateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateSkillService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CandidateSkillMapper.toCandidateSkill(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CandidateSkillBulkSchema))
  async bulk(@Body() body: CandidateSkillBulkModel, @Req() req: Request) {
    try {
      await this.candidateSkillService.bulk(
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
    @Query() query: CandidateSkillGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateSkillService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CandidateSkillMapper.toCandidateSkill(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CandidateSkillQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.candidateSkillService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CandidateSkillMapper.toCandidateSkilles(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CandidateSkillUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CandidateSkillUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateSkillService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CandidateSkillMapper.toCandidateSkill(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.candidateSkillService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
