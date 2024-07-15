import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { 
  IdentityModule, 
  MySQLModule, 
  SsoModule 
} from './app';


@Module({
  imports: [
    MySQLModule,
    SsoModule,
    IdentityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
