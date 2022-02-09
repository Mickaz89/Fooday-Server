import { IsDate, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Category } from 'src/categories/category.entity';

export class CreateReceptionDto {
  @IsOptional()
  reference: string;

  @IsOptional()
  delivery_date: Date;

  @IsOptional()
  status: string;

  @IsOptional()
  supplier: string;
}
