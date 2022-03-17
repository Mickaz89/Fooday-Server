import { IsNotEmpty } from 'class-validator';
import { Ingredient } from 'src/ingredient/ingredient.entity';
import { MeasurementUnits } from 'src/measurements-units/measurement-units.entity';

export class CreateRecipeIngredientDto {
  @IsNotEmpty()
  ingredient: Ingredient;

  @IsNotEmpty()
  measurementUnit: MeasurementUnits;

  @IsNotEmpty()
  quantity: number;
}
