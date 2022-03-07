import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { FileService } from 'src/file/file.service';
import { CreateMealDto } from './dtos/create-meal.dto';
import { MealService } from './meal.service';

@Controller('meal')
@UseGuards(AuthGuard())
// @UseGuards(AuthGuard())
export class MealController {
  constructor(
    private mealServices: MealService,
    private fileServices: FileService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createMeal(
    @Body() createMealDto: any,
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log('IMAGE URL meal ', createMealDto);
    // console.log('MEAL NAME ', createMealDto._parts[0][1]);
    // console.log('MEAL INGREDIENTS ', createMealDto._parts[1][0]);
    // console.log('MEAL IMAGE', createMealDto._parts[2][1]);
    console.log('IMAGE URL meal ', file);

    // const body = {
    //   name: createMealDto._parts[0][1],

    // }
    // return this.fileServices.uploadPublicFile(
    //   file.buffer,
    //   body.name,
    //   'image',
    //   user,
    // );

    // Upload image

    const image = await this.fileServices.uploadPublicFile(
      file.buffer,
      file.originalname,
      'image',
      user,
    );

    // console.log('CREATE MEAL DTO USER', user);
    // console.log(
    //   'CRETE MEAL DTO INGREDIENTS ',
    //   JSON.parse(createMealDto.ingredients),
    // );
    createMealDto.ingredients = JSON.parse(createMealDto.ingredients);
    console.log('CREATE MEAL DTO ', createMealDto);
    return this.mealServices.createMeal(createMealDto, user, image.url);
  }

  @Get()
  fetchMeals(@GetUser() user: User) {
    return this.mealServices.findAll(user);
  }

  @Delete('/:id')
  removeMeal(@Param('id') id: string, @GetUser() user: User) {
    return this.mealServices.removeMeal(id, user);
  }
}
