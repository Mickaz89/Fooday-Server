import { IsNotEmpty } from 'class-validator';
import { IngredientCategory } from 'src/ingredient-category/ingredient-category.entity';

export class CreateMeasurementUnitDto {
  @IsNotEmpty()
  name: string;
}
