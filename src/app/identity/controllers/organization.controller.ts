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

import { ResponseHelper } from 'src/helpers/response.helper';
import { AuthenticationMiddleware } from '../../../middlewares';
import { JoiValidationPipe } from 'src/validation';

import { OrganizationService } from '../services';
import {
  OrganizationCreateSchema,
  OrganizationUpdateSchema,
  OrganizationVerifySchema,
} from '../schemas';
import { OrganizationMapper } from '../mappers';
import {
  OrganizationCreateModel,
  OrganizationDetailModel,
  OrganizationQueryModel,
  OrganizationUpdateModel,
  OrganizationVerifyModel,
} from '../models';

@ApiTags('Identity')
@Controller('v1/organizations')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post('')
  @UsePipes(new JoiValidationPipe(OrganizationCreateSchema))
  async create(@Body() body: OrganizationCreateModel, @Req() req: Request) {
    try {
      const result = await this.organizationService.create(
        body,
        _.get(req, 'body.credentials'),
      );
      return OrganizationMapper.toOrganization(result);
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Get(':id')
  async get(
    @Param('id') id: string,
    @Query() query: OrganizationDetailModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.organizationService.findByIdOrFail(
        id,
        _.get(req, 'body.credentials'),
        query,
      );
      return OrganizationMapper.toOrganization(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Get('')
  async all(@Query() query: OrganizationQueryModel, @Req() req: Request) {
    try {
      const { rows, paging } = await this.organizationService.findAll(
        query,
        _.get(req, 'body.credentials'),
      );

      return {
        data: OrganizationMapper.toRawOrganizations(rows),
        paging,
      };
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(OrganizationUpdateSchema))
  async update(
    @Param('id') id: string,
    @Body() body: OrganizationUpdateModel,
    @Req() req: Request,
  ) {
    try {
      const result = await this.organizationService.update(
        id,
        body,
        _.get(req, 'body.credentials'),
      );
      return OrganizationMapper.toOrganization(result);
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }

  @Post('verify')
  @UsePipes(new JoiValidationPipe(OrganizationVerifySchema))
  async verify(@Body() body: OrganizationVerifyModel, @Req() req: Request) {
    try {
      await this.organizationService.verify(
        body,
        _.get(req, 'body.credentials'),
      );
      return ResponseHelper.Ok();
    } catch (error) {
      ResponseHelper.HttpException(error);
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.organizationService.delete(id, _.get(req, 'body.credentials'));

      return ResponseHelper.noContent();
    } catch (error) {
      return ResponseHelper.HttpException(error);
    }
  }
}
