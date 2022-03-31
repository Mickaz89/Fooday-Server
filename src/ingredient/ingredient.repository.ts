import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { Ingredient } from './ingredient.entity';

@EntityRepository(Ingredient)
export class IngredientRepository extends Repository<Ingredient> {
  async createIngredient(
    createIngredientDto: CreateIngredientDto,
    user: User,
    icon?: string,
  ) {
    const { name, category } = createIngredientDto;
    console.log('CREATE INGREDIENT REPOSITORY USER ', user);
    const ingredient = this.create({
      name,
      category,
      user,
      icon,
    });

    await this.save(ingredient);
    return ingredient;
  }
}
