import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthenticationService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationGoogleController } from './http/controllers';
import { GoogleStrategy } from './strategy';
import { AuthMiddleware } from './http/middlewares';

@Module({
    imports: [
        TypeOrmModule.forFeature([])
    ],
    controllers: [
        AuthenticationGoogleController
    ],
    providers: [
        AuthenticationService,
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
