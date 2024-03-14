import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from '../storage/storage.module';
import { MediaController } from './media.controller';
import { CandidateMediaController } from './ats-media/ats-media.controller';
import { MediaUserEntity } from './entities';
import { AuthenticationMiddleware } from './middlewares';
import { UserEntity } from '../recruiting/entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MediaUserEntity]), StorageModule],
  controllers: [MediaController, CandidateMediaController],
  providers: [AuthenticationMiddleware],
})
export class MediaModule {}
