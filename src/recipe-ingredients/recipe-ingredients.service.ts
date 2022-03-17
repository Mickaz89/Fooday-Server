import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipes } from 'src/recipes/recipes.entity';
import { CreateRecipeIngredientDto } from './dtos/create-recipe-ingredient.dto';
import { RecipeIngredientsRepository } from './recipe-ingredients.repository';

@Injectable()
export class RecipeIngredientsService {
  constructor(
    @InjectRepository(RecipeIngredientsRepository)
    private recipeIngredientsRepository: RecipeIngredientsRepository,
  ) {}

  async createRecipeIngredient(
    createRecipeIngredientDto: CreateRecipeIngredientDto,
    recipe?: Recipes,
  ) {
    return this.recipeIngredientsRepository.createRecipeIngredient(
      createRecipeIngredientDto,
      recipe,
    );
  }
}
