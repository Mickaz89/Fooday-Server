import { IsDate, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { ProductReception } from 'src/product-reception/product_reception.entity';

export class UpdateReceptionDto {
  @IsOptional()
  reference?: string;

  @IsOptional()
  delivery_date?: Date;

  @IsOptional()
  status?: string;

  @IsOptional()
  supplier?: string;

  @IsNotEmpty()
  productsReception?: ProductReception[];
}
