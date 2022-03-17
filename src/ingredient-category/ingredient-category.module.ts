import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { IngredientCategoryController } from './ingredient-category.controller';
import { IngredientCategoryRepository } from './ingredient-category.repository';
import { IngredientCategoryService } from './ingredient-category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngredientCategoryRepository]),
    AuthModule,
  ],
  controllers: [IngredientCategoryController],
  providers: [IngredientCategoryService],
})
export class IngredientCategoryModule {}
