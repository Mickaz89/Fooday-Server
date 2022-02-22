import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateMealDto } from './dtos/create-meal.dto';
import { MealService } from './meal.service';

@Controller('meal')
@UseGuards(AuthGuard())
export class MealController {
  constructor(private mealServices: MealService) {}

  @Post()
  createMeal(@Body() createMealDto: CreateMealDto, @GetUser() user: User) {
    return this.mealServices.createMeal(createMealDto, user);
  }

  @Get()
  fetchMeals(@GetUser() user: User) {
    return this.mealServices.findAll(user);
  }
}
