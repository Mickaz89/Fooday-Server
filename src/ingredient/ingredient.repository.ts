import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { Ingredient } from './ingredient.entity';

@EntityRepository(Ingredient)
export class IngredientRepository extends Repository<Ingredient> {
  async createIngredient(createIngredientDto: CreateIngredientDto, user: User) {
    const { name, amount, unit } = createIngredientDto;

    const ingredient = this.create({
      name,
      amount,
      unit,
      user,
    });

    await this.save(ingredient);
    return ingredient;
  }
}
