import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AWSStorageService } from '../storage/aws-storage.service';
import { FileUploadDto } from './file-upload-dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthenticationMiddleware } from './middlewares';

@ApiTags('Media')
@ApiBearerAuth()
@UseInterceptors(AuthenticationMiddleware)
@Controller('v1/media')
export class MediaController {
  constructor(private storageService: AWSStorageService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() data: FileUploadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return this.storageService.s3Save(
      'media/' + data.mediaId + file.originalname,
      file.buffer,
    );
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
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
      Location: process.env.SERVER_HOST + 'uploads/' + file.filename,
    };
  }
}
