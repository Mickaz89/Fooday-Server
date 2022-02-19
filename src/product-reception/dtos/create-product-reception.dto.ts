import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateProductReceptionDto {
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  expiration_date: Date;
}

export class UpdateProductReceptionDto extends PartialType(
  CreateProductReceptionDto,
) {}
