import {
    Controller,
    Get,
    Next,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import {
    NextFunction,
    Request,
    Response
} from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from '../../services';
import { GoogleAuthGuard } from '../../guard';
import { GoogleStrategy } from '../../strategy/google.strategy';
import { GoogleProfileMapper } from '../../Mappers';

@ApiTags('GoogleIdentity')
@Controller('v1/auth/google')
export class AuthenticationGoogleController {

    constructor(
        private authService: AuthenticationService,
        private googleStrategy: GoogleStrategy
    ) { };

    // private googleAccountService: GoogleAccountService;
    // private authService: AuthenticationService;

    // constructor(
    //     @inject(TYPES.GoogleAccountService) 
    //     googleAccountService: GoogleAccountService,
    //     @inject(TYPES.AuthenticationService) 
    //     authService: AuthenticationService,
    // ) {
    //     this.googleAccountService = googleAccountService;
    //     this.authService = authService;
    // };

    @Get()
    @UseGuards(GoogleAuthGuard)
    async googleAuth(
        @Req()
        req: Request,
    ) { };

    @Get('callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(
        @Req()
        req: Request,
        @Res()
        res: Response,
    ) {
        try {
            console.log(req?.user);
            //Auth Google
            const profileGoogle = GoogleProfileMapper.toGoogleProfile(req?.user);
            console.log("profileGoogle: ", profileGoogle);
            const client_token = await this.authService.generateToken(profileGoogle);
            console.log(client_token);
            res.cookie('client_token', client_token).redirect(`http://localhost:5000/api/v1/auth/google/client-token?continue=${"http://localhost:3003"}`);
            return;
        } catch (error: any) {
            console.error(error);
        }
    };

    @Get('client-token')
    async responseClientToken(
        @Req()
        req: Request,
        @Res()
        res: Response,
    ) {
        try {
            res.redirect(`${req.query.continue}`);
        } catch (error) {
            res.status(500).send('An error occurred');
        }
    };

    //Test api
    @Get('me')
    async me(
        @Req()
        req: Request,
        @Res()
        res: Response,
    ) {
        try {
            console.log('me');
            return;
        } catch (error) {
            res.status(500).send('An error occurred');
        }
    };

    // async logOutGoogle(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const client_token = req.body.client_token;
    //         console.log(client_token);
    //         const verifyToken = await this.authService.verifyToken(client_token);
    //         const sub = typeof verifyToken?.sub === 'string' ? JSON.parse(verifyToken?.sub) : verifyToken?.sub;
    //         let access_token = sub?.access_token;
    //         const token_db = await this.googleAccountService.getAccessToken(sub?.user_id);
    //         if (!token_db) return res.status(500);

    //         const isMatch = await this.authService.dencrypt(access_token, token_db);
    //         if (isMatch) {
    //             await axios.post('https://oauth2.googleapis.com/revoke', {
    //                 token: access_token
    //             });
    //         }
    //         res.status(200).send('Logout successfull');
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send('An error occurred');
    //     }
    // };
};
