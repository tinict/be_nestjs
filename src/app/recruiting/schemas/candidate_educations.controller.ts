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
    CampaignEducationBulkSchema,
    CampaignEducationCreateSchema,
    CampaignEducationUpdateSchema,
} from '../schemas';
import { CampaignEducationMapper } from '../mappers';
import {
    CampaignEducationBulkModel,
    CampaignEducationCreateModel,
    CampaignEducationGetModel,
    CampaignEducationQueryModel,
    CampaignEducationUpdateModel,
} from '../models';
import { CampaignEducationService } from '../services';

@ApiTags('Recruiting')
@Controller('v1/campaign-education')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
export class CampaignEducationController {
    constructor(
        private readonly campaignEducationService: CampaignEducationService,
    ) { }

    @Post('')
    @UsePipes(new JoiValidationPipe(CampaignEducationCreateSchema))
    async create(@Body() body: CampaignEducationCreateModel, @Req() req: Request) {
        try {
            const result = await this.campaignEducationService.create(
                body,
                _.get(req, 'body.credentials'),
            );
            return CampaignEducationMapper.toCampaignEducation(result);
        } catch (error) {
            return ResponseHelper.HttpException(error);
        }
    }

    @Post('bulk')
    @UsePipes(new JoiValidationPipe(CampaignEducationBulkSchema))
    async bulk(@Body() body: CampaignEducationBulkModel, @Req() req: Request) {
        try {
            await this.campaignEducationService.bulk(
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
        @Query() query: CampaignEducationGetModel,
        @Param('id') id: string,
        @Req() req: Request,
    ) {
        try {
            const result = await this.campaignEducationService.findByIdOrFail(
                id,
                _.get(req, 'body.credentials'),
                query,
            );
            return CampaignEducationMapper.toCampaignEducation(result);
        } catch (error) {
            return ResponseHelper.HttpException(error);
        }
    }

    @Get('')
    async all(@Query() query: CampaignEducationQueryModel, @Req() req: Request) {
        try {
            const { rows, paging } = await this.campaignEducationService.all(
                query,
                _.get(req, 'body.credentials'),
            );

            return {
                data: CampaignEducationMapper.toCampaignEducations(rows),
                paging,
            };
        } catch (error) {
            ResponseHelper.HttpException(error);
        }
    }

    @Put(':id')
    @UsePipes(new JoiValidationPipe(CampaignEducationUpdateSchema))
    async update(
        @Param('id') id: string,
        @Body() body: CampaignEducationUpdateModel,
        @Req() req: Request,
    ) {
        try {
            const result = await this.campaignEducationService.update(
                id,
                body,
                _.get(req, 'body.credentials'),
            );

            return CampaignEducationMapper.toCampaignEducation(result);
        } catch (error) {
            ResponseHelper.HttpException(error);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Req() req: Request) {
        try {
            await this.campaignEducationService.delete(
                id,
                _.get(req, 'body.credentials'),
            );
        } catch (error) {
            return ResponseHelper.HttpException(error);
        }
    }
}
