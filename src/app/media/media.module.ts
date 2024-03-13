import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationMiddleware } from '../../middlewares';
import { StorageModule } from '../storage/storage.module';
import { MediaController } from './media.controller';
import { CandidateMediaController } from './ats-media/ats-media.controller';
import { IdeUserEntity } from '../identity/entities';

@Module({
  imports: [TypeOrmModule.forFeature([IdeUserEntity]), StorageModule],
  controllers: [MediaController, CandidateMediaController],
  providers: [AuthenticationMiddleware],
})
export class MediaModule {}
