import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateReceptionDto } from './dtos/create-reception.dto';
import { ReceptionsService } from './receptions.service';

@UseGuards(AuthGuard())
@Controller('receptions')
export class ReceptionsController {
  constructor(private receptionsService: ReceptionsService) {}
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createNewReception(
    @Body() body: CreateReceptionDto,
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.receptionsService.create(file, body, user);
  }

  @Get('/')
  async getAllReceptions(@GetUser() user: User) {
    return await this.receptionsService.getAllReceptions(user);
  }
}
