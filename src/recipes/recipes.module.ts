import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesRepository } from './recipes.repository';
import { AuthModule } from 'src/auth/auth.module';
import { RecipeIngredientsService } from 'src/recipe-ingredients/recipe-ingredients.service';
import { RecipeIngredientsModule } from 'src/recipe-ingredients/recipe-ingredients.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipesRepository]),
    AuthModule,
    RecipeIngredientsModule,
    FileModule,
  ],
  providers: [RecipesService],
  controllers: [RecipesController],
})
export class RecipesModule {}
