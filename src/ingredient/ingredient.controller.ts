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
import { FileService } from 'src/file/file.service';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
@UseGuards(AuthGuard())
export class IngredientController {
  constructor(
    private ingredientServices: IngredientService,
    private fileServices: FileService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createIngredient(
    @Body() createIngredientDto: CreateIngredientDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Upload image

    const icon = await this.fileServices.uploadPublicFile(
      file.buffer,
      file.originalname,
      'image',
    );

    console.log('IMAGE ', icon);

    return this.ingredientServices.createIngredient(
      createIngredientDto,
      icon.url,
    );
  }

  @Get()
  findAllIngredients() {
    return this.ingredientServices.findAllIngredients();
  }
}
