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
    @GetUser() user: User,
  ) {
    // Upload image
    let icon = null;
    if (file) {
      icon = await this.fileServices.uploadPublicFile(
        file.buffer,
        file.originalname,
        'image',
        user,
      );

      console.log('IMAGE ', icon);
    }
    console.log('USER ', user);
    return this.ingredientServices.createIngredient(
      createIngredientDto,
      user,
      icon ? icon.url : null,
    );
  }

  @Get()
  findAllIngredients(@GetUser() user: User) {
    return this.ingredientServices.findAllIngredients(user);
  }
}
