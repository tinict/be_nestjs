import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { redisStore } from 'cache-manager-redis-store';
import { CommonModule } from './app/common/common.module';
import { MysqlModule } from './app/database/mysql';

@Module({
  imports: [
    CacheModule.register({
      useFactory: async () =>
        await redisStore({
          ttl: +process.env.REDIS_TTL || 300,
          socket: {
            host: process.env.REDIS_HOST || '14.225.206.155',
            port: +process.env.REDIS_PORT || 6379,
          },
        }),
    }),
    MysqlModule,
    CommonModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
