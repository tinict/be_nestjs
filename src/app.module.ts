import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { redisStore } from 'cache-manager-redis-store';
import { CommonModule } from './app/modules/common/common.module';
import { MediaModule } from './app/modules/media/media.module';
import { RecruitingModule } from './app/modules/recruiting/recruiting.module';
import { IdentityModule } from './app/modules/identity/identity.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'gce_dev',
      entities: [__dirname + '../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    }),

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
    IdentityModule,
    RecruitingModule,
    MediaModule,
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
