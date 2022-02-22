import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealRepository } from './meal.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MealRepository]), AuthModule],
  providers: [MealService],
  controllers: [MealController]
})
export class MealModule {}
