import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateIngredientCategoryDto } from './dtos/create-ingredient-category.dto';
import { IngredientCategoryRepository } from './ingredient-category.repository';

@Injectable()
export class IngredientCategoryService {
  constructor(
    private ingredientCategoryRepository: IngredientCategoryRepository,
  ) {}
  async createIngredientCategory(
    createIngredientCategoryDto: CreateIngredientCategoryDto,
    user: User,
  ) {
    const category = this.ingredientCategoryRepository.create(
      createIngredientCategoryDto,
    );

    return await this.ingredientCategoryRepository.save(category);
  }
}
