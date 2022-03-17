import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealRepository } from './meal.repository';
import { AuthModule } from 'src/auth/auth.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([MealRepository]), AuthModule, FileModule],
  providers: [MealService],
  controllers: [MealController],
})
export class MealModule {}
