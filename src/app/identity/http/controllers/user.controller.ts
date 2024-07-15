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

import { ResponseHelper } from '../../../../helpers';
// import { AuthenticationMiddleware } from '../middlewares/auth.middleware';
import { JoiValidationPipe } from '../../../../validation';

import {
    UserBulkSchema,
    UserCreateSchema,
    UserUpdateSchema,
} from '../../schemas';
import { UserMapper } from '../../mappers';
import {
    UserBulkModel,
    UserCreateModel,
    UserGetModel,
    UserQueryModel,
    UserUpdateModel,
} from '../../models';
import { UserService } from '../../services';

@ApiTags('User')
@Controller('v1/user')
@ApiBearerAuth()
// @UseInterceptors(AuthenticationMiddleware)
export class UserController {
    constructor(
        private readonly UserService: UserService,
    ) { };

    @Post('')
    @UsePipes(new JoiValidationPipe(UserCreateSchema))
    async create(@Body() body: UserCreateModel, @Req() req: Request) {
        try {
            const result = await this.UserService.create(
                body,
                _.get(req, 'body.credentials'),
            );
            return UserMapper.toUser(result);
        } catch (error) {
            return ResponseHelper.HttpException(error);
        }
    };

    @Post('bulk')
    @UsePipes(new JoiValidationPipe(UserBulkSchema))
    async bulk(@Body() body: UserBulkModel, @Req() req: Request) {
        try {
            await this.UserService.bulk(
                body.items,
                _.get(req, 'body.credentials'),
            );

            return ResponseHelper.Ok();
        } catch (error) {
            return ResponseHelper.HttpException(error);
        }
    };

    @Get(':id')
    async get(
        @Query() query: UserGetModel,
        @Param('id') id: string,
        @Req() req: Request,
    ) {
        try {
            const result = await this.UserService.findByIdOrFail(
                id,
                _.get(req, 'body.credentials'),
                query,
            );
            return UserMapper.toUser(result);
        } catch (error) {
            return ResponseHelper.HttpException(error);
        }
    };

    @Get('')
    async all(@Query() query: UserQueryModel, @Req() req: Request) {
        try {
            const { rows, paging } = await this.UserService.all(
                query,
                _.get(req, 'body.credentials'),
            );

            return {
                data: UserMapper.toUsers(rows),
                paging,
            };
        } catch (error) {
            ResponseHelper.HttpException(error);
        }
    };

    @Put(':id')
    @UsePipes(new JoiValidationPipe(UserUpdateSchema))
    async update(
        @Param('id') id: string,
        @Body() body: UserUpdateModel,
        @Req() req: Request,
    ) {
        try {
            const result = await this.UserService.update(
                id,
                body,
                _.get(req, 'body.credentials'),
            );

            console.log(id);

            return UserMapper.toUser(result);
        } catch (error) {
            ResponseHelper.HttpException(error);
        }
    };

    @Delete(':id')
    async delete(@Param('id') id: string, @Req() req: Request) {
        try {
            await this.UserService.delete(
                id,
                _.get(req, 'body.credentials'),
            );
        } catch (error) {
            return ResponseHelper.HttpException(error);
        }
    };
};
