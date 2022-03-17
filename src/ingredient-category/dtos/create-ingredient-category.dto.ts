import { IsNotEmpty } from 'class-validator';

export class CreateIngredientCategoryDto {
  @IsNotEmpty()
  name: string;
}
