import {
    Injectable,
    NestMiddleware
} from '@nestjs/common';
import { ResponseHelper } from 'src/helpers';
import * as MSG from '../../../../../constants/msg';
import { AuthenticationService } from '../../services';

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
        const authorization = (
            req?.headers?.authorization?.toString() || ''
        );

        const verifyToken = await this.authService.verifyToken(authorization);
        if (verifyToken === null) {
            throw ResponseHelper.HttpException(
                ResponseHelper.UnAuthorized(MSG.MSG_AUTH_FAILED),
            );
        }

        console.log("Decode: ", verifyToken);

        next();
    };

    // async isAuthenticated(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const authHeader = req.headers.authorization;
    //         const client_token = authHeader || '';
    //         console.log(client_token);
    //         if (client_token === null) {
    //             return res.status(401).json({ error: 'Unauthorized' });
    //         }
    //         const verifyToken = await this.authService.verifyToken(client_token);
    //         if (verifyToken === null) {
    //             return res.status(401).json({ error: 'Unauthorized' });
    //         }

    //         req.user = verifyToken;
    //         console.log(verifyToken);
    //         next();
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send('An error occurred');
    //     }
    // };
};
