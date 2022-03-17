import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateIngredientCategoryDto } from './dtos/create-ingredient-category.dto';
import { IngredientCategoryService } from './ingredient-category.service';

@Controller('ingredient-category')
@UseGuards(AuthGuard())
export class IngredientCategoryController {
  constructor(private ingredientCategoryServices: IngredientCategoryService) {}
  @Post()
  createIngredientCategory(
    @Body() createIngredientCategoryDto: CreateIngredientCategoryDto,
    @GetUser() user: User,
  ) {
    return this.ingredientCategoryServices.createIngredientCategory(
      createIngredientCategoryDto,
      user,
    );
  }
}
