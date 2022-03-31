import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { IngredientRepository } from './ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(IngredientRepository)
    private ingredientRepository: IngredientRepository,
  ) {}

  async createIngredient(
    createIngredientDto: CreateIngredientDto,
    user: User,
    icon?: string,
  ) {
    return this.ingredientRepository.createIngredient(
      createIngredientDto,
      user,
      icon,
    );
  }

  async findAllIngredients(user) {
    const ingredients = await this.ingredientRepository.find({
      where: { user },
      relations: ['category'],
    });
    const result = groupBy(ingredients, 'category');

    return ingredients;
  }
}

function groupBy(array, key) {
  return array.reduce(function (r, a) {
    r[a.category.name] = r[a.category.name] || [];
    r[a.category.name].push(a);
    return r;
  }, {});
}
