import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from './storage/storage.module';
import { MediaController } from './media.controller';
import { CandidateMediaController } from './ats-media/ats-media.controller';
import { MediaUserEntity } from './entities';
import { AuthenticationMiddleware } from './middlewares';

@Module({
  imports: [TypeOrmModule.forFeature([MediaUserEntity]), StorageModule],
  controllers: [MediaController, CandidateMediaController],
  providers: [AuthenticationMiddleware],
})
export class MediaModule {}
