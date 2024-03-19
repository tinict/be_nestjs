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
  SkillBulkSchema,
  SkillCreateSchema,
  SkillUpdateSchema,
} from '../schemas';
import { SkillMapper } from '../mappers';
import {
    SkillBulkModel,
    SkillCreateModel,
    SkillGetModel,
    SkillQueryModel,
    SkillUpdateModel,
} from '../models';
import { SkillService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/skills')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class SkillController {
  constructor(
    private readonly skillService: SkillService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(SkillCreateSchema))
  async create(@Body() body: SkillCreateModel, @Req() req: Request) {
    try {
      const result = await this.skillService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return SkillMapper.toSkill(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(SkillBulkSchema))
  async bulk(@Body() body: SkillBulkModel, @Req() req: Request) {
    try {
      await this.skillService.bulk(
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
    @Query() query: SkillGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.skillService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return SkillMapper.toSkill(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: SkillQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.skillService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: SkillMapper.toSkills(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(SkillUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: SkillUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.skillService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return SkillMapper.toSkill(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.skillService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
