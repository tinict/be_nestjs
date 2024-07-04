import { Module } from '@nestjs/common';
import { AuthenticationService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationGoogleController } from './http/controllers';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([

        ])
    ],
    controllers: [
        AuthenticationGoogleController
    ],
    providers: [
        AuthenticationService,
        GoogleStrategy
    ],
})
export class GoogleModule {}
