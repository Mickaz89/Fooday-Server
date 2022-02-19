import {
    Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import CreateFileDto from './dtos/create-file.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileServices: FileService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async addPhoto(
    @Body() body: CreateFileDto,
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileServices.uploadPublicFile(
      file.buffer,
      body.name,
      'image',
      user,
    );
  }
}
