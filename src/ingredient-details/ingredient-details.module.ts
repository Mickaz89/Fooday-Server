import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { IngredientDetailsController } from './ingredient-details.controller';
import { IngredientDetailsRepository } from './ingredient-details.repository';
import { IngredientDetailsService } from './ingredient-details.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngredientDetailsRepository]),
    AuthModule,
  ],
  controllers: [IngredientDetailsController],
  providers: [IngredientDetailsService],
})
export class IngredientDetailsModule {}
