import { IsDate, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

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
