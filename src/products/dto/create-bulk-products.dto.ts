import { IsDate, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Product } from '../product.entity';

export class CreateBulkProductsDto {
  products: Product[];
}
