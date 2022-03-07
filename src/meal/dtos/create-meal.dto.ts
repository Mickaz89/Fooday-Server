import { IsNotEmpty, IsOptional } from 'class-validator';
import { Ingredient } from 'src/ingredient/ingredient.entity';
export class CreateMealDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  ingredients: Ingredient[];
}
