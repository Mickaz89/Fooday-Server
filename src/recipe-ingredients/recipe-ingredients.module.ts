import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RecipeIngredientsController } from './recipe-ingredients.controller';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import { RecipeIngredientsRepository } from './recipe-ingredients.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeIngredientsRepository]),
    AuthModule,
  ],
  providers: [RecipeIngredientsService],
  controllers: [RecipeIngredientsController],
  exports: [RecipeIngredientsService],
})
export class RecipeIngredientsModule {}
