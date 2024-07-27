import {
    Injectable,
    NestMiddleware
} from '@nestjs/common';
import { ResponseHelper } from 'src/helpers';
import * as MSG from '../../../../../constants/msg';
import { AuthenticationService } from '../../services';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private authService: AuthenticationService
    ) { };

    async use(req: any, res: any, next: (error?: any) => void) {
        if (!req?.headers?.authorization) {
            throw ResponseHelper.HttpException(
                ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED),
            );
        }

        //Get Client token
        const client_token: string = (
            req?.headers?.authorization?.toString() || ''
        );

        const profile: JwtPayload | string = await this.authService.verifyToken(client_token);
        if (!profile) {
            throw ResponseHelper.HttpException(
                ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED),
            );
        }

        //Model
        if (profile) {
            if (typeof profile.sub === 'object') {
                try {
                    const payload = profile.sub || null;
                    if (!payload) {
                        throw ResponseHelper.HttpException(
                            ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED),
                        );
                    }
                    
                    console.log('Payload Google Id: ', payload?.google_id)
                    req.user = payload?.google_id;
                } catch (error: any) {
                    console.error(error);
                }
            }
        }

        next();
    };
};
