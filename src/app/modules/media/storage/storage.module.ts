import { Module } from '@nestjs/common';
import { AWSStorageService } from './aws-storage.service';

@Module({
  providers: [AWSStorageService],
  exports: [AWSStorageService],
})
export class StorageModule {}
