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

  async createIngredient(createIngredientDto: CreateIngredientDto, user: User) {
    return this.ingredientRepository.createIngredient(
      createIngredientDto,
      user,
    );
  }
}
