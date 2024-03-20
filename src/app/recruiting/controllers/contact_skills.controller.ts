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
  ContactSkillBulkSchema,
  ContactSkillCreateSchema,
  ContactSkillUpdateSchema,
} from '../schemas';
import { ContactSkillMapper } from '../mappers';
import {
  ContactSkillBulkModel,
  ContactSkillCreateModel,
  ContactSkillGetModel,
  ContactSkillQueryModel,
  ContactSkillUpdateModel,
} from '../models';
import { ContactSkillService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/contact-skills')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class ContactSkillController {
  constructor(
    private readonly contactSkillService: ContactSkillService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(ContactSkillCreateSchema))
  async create(@Body() body: ContactSkillCreateModel, @Req() req: Request) {
    try {
      const result = await this.contactSkillService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return ContactSkillMapper.toContactSkill(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(ContactSkillBulkSchema))
  async bulk(@Body() body: ContactSkillBulkModel, @Req() req: Request) {
    try {
      await this.contactSkillService.bulk(
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
    @Query() query: ContactSkillGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.contactSkillService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return ContactSkillMapper.toContactSkill(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: ContactSkillQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.contactSkillService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: ContactSkillMapper.toContactSkills(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(ContactSkillUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: ContactSkillUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.contactSkillService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return ContactSkillMapper.toContactSkill(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.contactSkillService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
