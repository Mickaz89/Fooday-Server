import { Body, Controller, Post } from '@nestjs/common';
import { CreateRecipeIngredientDto } from './dtos/create-recipe-ingredient.dto';
import { RecipeIngredientsService } from './recipe-ingredients.service';

@Controller('recipe-ingredients')
export class RecipeIngredientsController {
  constructor(private recipeIngredientsServices: RecipeIngredientsService) {}

  @Post()
  createRecipeIngredient(
    @Body() createRecipeIngredientDto: CreateRecipeIngredientDto,
  ) {
    return this.recipeIngredientsServices.createRecipeIngredient(
      createRecipeIngredientDto,
    );
  }
}
