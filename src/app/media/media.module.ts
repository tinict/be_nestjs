import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationMiddleware } from '../../middlewares';
import { UserEntity } from '../recruiting/entities';
import { StorageModule } from '../storage/storage.module';
import { MediaController } from './media.controller';
import { CandidateMediaController } from './ats-media/ats-media.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), StorageModule],
  controllers: [MediaController, CandidateMediaController],
  providers: [AuthenticationMiddleware],
})
export class MediaModule {}
