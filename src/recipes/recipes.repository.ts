import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Recipes } from './recipes.entity';
import { CreateRecipeDto } from './dtos/create-recipe.dto';

@EntityRepository(Recipes)
export class RecipesRepository extends Repository<Recipes> {
  async createRecipe(
    createRecipeDto: CreateRecipeDto,
    imageUrl: string,
    user: User,
  ) {
    const { name, description, cookingTime, servingSize } = createRecipeDto;

    const recipeIngredient = this.create({
      name,
      description,
      cookingTime,
      servingSize,
      picture: imageUrl,
      user,
    });

    await this.save(recipeIngredient);
    return recipeIngredient;
  }
}
