import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class AWSStorageService {
  private s3 = new S3();

  async s3Save(key: string, media: Buffer) {
    return await this.s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Body: media,
        Key: key,
        ACL: 'public-read',
      })
      .promise();
  }
}
