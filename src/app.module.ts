import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';;
import { CommonModule } from './app/common/common.module';
import { MysqlModule } from './app/database/mysql';
import { SsoModule } from './app/sso/sso.module';

@Module({
  imports: [
    MysqlModule,
    CommonModule,
    SsoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
