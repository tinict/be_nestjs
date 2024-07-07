import {
    Controller,
    Get,
    Next,
    Param,
    Query,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    NextFunction,
    Request,
    Response
} from 'express';
import { GoogleAccountService } from '../../services';

@ApiTags('GoogleIdentity')
@Controller('v1/sso/google/me')
export class GoogleAccountController {

    constructor(
        private googleAccountService: GoogleAccountService,
    ) { };

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    @Get('me')
    async me(
        @Req()
        req: Request,
        @Res()
        res: Response
    ) {
        try {
            const google_id = req.user;
            const me = await this.googleAccountService.me(google_id as string);
            return res.status(200).json(me);
        } catch (error) {
            res.status(500).send('An error occurred');
        }
    };
};
