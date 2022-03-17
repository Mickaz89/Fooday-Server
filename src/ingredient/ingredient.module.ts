import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './ingredient.entity';
import { AuthModule } from 'src/auth/auth.module';
import { IngredientRepository } from './ingredient.repository';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngredientRepository]),
    AuthModule,
    FileModule,
  ],
  providers: [IngredientService],
  controllers: [IngredientController],
})
export class IngredientModule {}
