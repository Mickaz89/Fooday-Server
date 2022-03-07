import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
import { User } from 'src/auth/user.entity';
import { CreateMealDto } from './dtos/create-meal.dto';
import { MealRepository } from './meal.repository';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(MealRepository)
    private mealRepository: MealRepository,
  ) {}

  async createMeal(
    createMealDto: CreateMealDto,
    user: User,
    imageUrl?: string,
  ) {
    // Create Meal

    const meal = this.mealRepository.create(createMealDto);

    console.log('MEAL INGREDIENTS ', createMealDto.ingredients);
    meal.ingredients = createMealDto.ingredients;

    console.log('MEAL INGREDIENTS ', meal);
    meal.user = user;
    meal.picture = imageUrl;

    // console.log('MEAL  ', meal);

    return this.mealRepository.save(meal);
    //Create ingredients and assign meal to meal just created

    //Save meal
  }
  async removeMeal(id: string, user: User) {
    const result = await this.mealRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async findAll(user: User) {
    return this.mealRepository.find({ where: { user } });
  }
}
