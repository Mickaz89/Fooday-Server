import { IsDate, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Category } from 'src/categories/category.entity';
import { Reception } from 'src/receptions/reception.entity';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsNotEmpty()
  @IsDateString()
  expiration_date: Date;

  @IsDateString()
  @IsOptional()
  last_open: Date;

  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  reception: Reception;

  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  pictureUrl: string;
}
