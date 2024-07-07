import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { 
  CommonModule, 
  IdentityModule, 
  MySQLModule, 
  SsoModule 
} from './app';


@Module({
  imports: [
    MySQLModule,
    CommonModule,
    SsoModule,
    IdentityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
