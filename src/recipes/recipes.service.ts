import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { String } from 'aws-sdk/clients/apigateway';
import { use } from 'passport';
import { User } from 'src/auth/user.entity';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { RecipesRepository } from './recipes.repository';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipesRepository)
    private recipesRepository: RecipesRepository,
  ) {}
  createRecipe(createRecipeDto: CreateRecipeDto, imageUrl: string, user: User) {
    return this.recipesRepository.createRecipe(createRecipeDto, imageUrl,  user);
  }

  findAllRecipes(user: User) {
    return this.recipesRepository.find({
      where: { user },
      relations: [
        'ingredients',
        'ingredients.ingredient',
        'ingredients.measurementUnit',
      ],
    });
  }
}
