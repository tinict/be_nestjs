import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { 
  CommonModule, 
  IdentityModule, 
  MysqlModule, 
  SsoModule 
} from './app';


@Module({
  imports: [
    MysqlModule,
    CommonModule,
    SsoModule,
    IdentityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
