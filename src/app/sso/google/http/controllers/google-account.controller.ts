import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('GoogleAccount')
@Controller('v1/google-account')
export class GoogleAccountController {

    constructor() {};

    // async me(req: Request, res: Response) {
    //     try {
    //         const google_id: { sub?: { user_id?: string | undefined } | undefined } = req.user!;
    //         if (google_id.sub === undefined) return res.status(500).json({ error: 'Unauthorized' });
    //         const me = await this.googleAccountService.me(google_id.sub?.user_id ?? '');
    //         console.log("me: " + me);
    //         return res.status(200).json(me);
    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }
    // };
};
