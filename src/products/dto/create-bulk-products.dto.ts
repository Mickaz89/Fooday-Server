import { IsDate, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Category } from 'src/categories/category.entity';
import { Product } from '../product.entity';

export class CreateBulkProductsDto {
  products: Product[];
}
