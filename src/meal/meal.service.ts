import { Injectable } from '@nestjs/common';
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

  async createMeal(createMealDto: CreateMealDto, user: User) {
    // Create Meal

    const meal = this.mealRepository.create(createMealDto);
    meal.user = user;

    console.log('MEAL  ', meal);

    return this.mealRepository.save(meal);
    //Create ingredients and assign meal to meal just created

    //Save meal
  }

  async findAll(user: User) {
    return this.mealRepository.find({ where: { user } });
  }
}
