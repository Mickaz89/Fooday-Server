import { IsNotEmpty } from 'class-validator';

export class CreateIngredientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  unit: string;
}
