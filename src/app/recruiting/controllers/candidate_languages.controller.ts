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
  CandidateLanguageBulkSchema,
  CandidateLanguageCreateSchema,
  CandidateLanguageUpdateSchema,
} from '../schemas';
import { CandidateLanguageMapper } from '../mappers';
import {
  CandidateLanguageBulkModel,
  CandidateLanguageCreateModel,
  CandidateLanguageGetModel,
  CandidateLanguageQueryModel,
  CandidateLanguageUpdateModel,
} from '../models';
import { CandidateLanguageService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/candidate-languages')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CandidateLanguageController {
  constructor(
    private readonly candidateLanguageService: CandidateLanguageService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(CandidateLanguageCreateSchema))
  async create(
    @Body() body: CandidateLanguageCreateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateLanguageService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return CandidateLanguageMapper.toCandidateLanguage(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(CandidateLanguageBulkSchema))
  async bulk(@Body() body: CandidateLanguageBulkModel, @Req() req: Request) {
    try {
      await this.candidateLanguageService.bulk(
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
    @Query() query: CandidateLanguageGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateLanguageService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return CandidateLanguageMapper.toCandidateLanguage(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: CandidateLanguageQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.candidateLanguageService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: CandidateLanguageMapper.toCandidateLanguagees(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(CandidateLanguageUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: CandidateLanguageUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.candidateLanguageService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return CandidateLanguageMapper.toCandidateLanguage(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.candidateLanguageService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
