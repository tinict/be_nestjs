import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileUploadDto } from '../file-upload-dto';
import { AWSStorageService } from '../../storage/aws-storage.service';

@ApiTags('Candidate')
@Controller('v1/ats-media')
export class CandidateMediaController {
  constructor(private storageService: AWSStorageService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './ats',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async upload(
    @Body() data: FileUploadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      ...file,
      Key: data.mediaId,
      Location: process.env.SERVER_HOST + 'ats/' + file.filename,
    };
  }
}
