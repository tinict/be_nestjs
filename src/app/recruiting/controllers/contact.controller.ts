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
  ContactBulkSchema,
  ContactCreateSchema,
  ContactUpdateSchema,
} from '../schemas';
import { ContactMapper } from '../mappers';
import {
  ContactBulkModel,
  ContactCreateModel,
  ContactGetModel,
  ContactQueryModel,
  ContactUpdateModel,
} from '../models';
import { ContactService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/contacts')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
  ) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(ContactCreateSchema))
  async create(@Body() body: ContactCreateModel, @Req() req: Request) {
    try {
      const result = await this.contactService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return ContactMapper.toContact(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('bulk')
  @UsePipes(new JoiValidationPipe(ContactBulkSchema))
  async bulk(@Body() body: ContactBulkModel, @Req() req: Request) {
    try {
      await this.contactService.bulk(
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
    @Query() query: ContactGetModel,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const result = await this.contactService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return ContactMapper.toContact(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: ContactQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.contactService.all(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: ContactMapper.toContacts(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(ContactUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: ContactUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.contactService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );

      return ContactMapper.toContact(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.contactService.delete(
        id,
        _.get(req, 'body.credentials'),
      );
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
