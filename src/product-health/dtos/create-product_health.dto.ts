import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateProductHealthDto {
  @IsNotEmpty()
  expiration_date: Date;

  @IsOptional()
  last_open?: Date;
}
