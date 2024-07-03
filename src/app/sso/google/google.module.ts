import { Module } from '@nestjs/common';
import { AuthenticationService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([

        ])
    ],
    controllers: [

    ],
    providers: [
        AuthenticationService,
    ]
})
export class GoogleModule {}
