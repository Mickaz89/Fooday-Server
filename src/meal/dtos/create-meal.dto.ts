import { IsNotEmpty, IsOptional } from 'class-validator';
import { Ingredient } from 'src/ingredient/ingredient.entity';
export class CreateMealDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  ingredients: Ingredient[];
}
