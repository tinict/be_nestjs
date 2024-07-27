import { 
    Global, 
    Module 
} from '@nestjs/common';
import { UserService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { UserController } from './http/controllers';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity
        ])
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ],
    exports: [
        IdentityModule,
        UserService,
    ]
})

export class IdentityModule {};
