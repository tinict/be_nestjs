import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthenticationService, GoogleAccountService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
    AuthenticationGoogleController, 
    GoogleAccountController 
} from './http/controllers';
import { GoogleStrategy } from './strategy';
import { AuthMiddleware } from './http/middlewares';
import { UserEntity } from 'src/app/identity/entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity
        ])
    ],
    controllers: [
        AuthenticationGoogleController,
        GoogleAccountController
    ],
    providers: [
        AuthenticationService,
        GoogleAccountService,
        GoogleStrategy
    ],
})
export class GoogleModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'v1/auth/google/me', method: RequestMethod.GET }
            );
    }
};
