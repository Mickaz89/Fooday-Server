import { Recipes } from 'src/recipes/recipes.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRecipeIngredientDto } from './dtos/create-recipe-ingredient.dto';
import { RecipeIngredients } from './recipe-ingredients.entity';

@EntityRepository(RecipeIngredients)
export class RecipeIngredientsRepository extends Repository<RecipeIngredients> {
  async createRecipeIngredient(
    createRecipeIngredientDto: CreateRecipeIngredientDto,
    recipe: Recipes,
  ) {
    const { ingredient, quantity, measurementUnit } = createRecipeIngredientDto;

    const recipeIngredient = this.create({
      ingredient,
      quantity,
      measurementUnit,
      recipe,
    });

    await this.save(recipeIngredient);
    return recipeIngredient;
  }
}
