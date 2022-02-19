import { IsDate, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Reception } from 'src/receptions/reception.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ProductCategory } from 'src/product-category/product_category.entity';
import { ProductReception } from 'src/product-reception/product_reception.entity';
import { ProductInventory } from 'src/product-inventory/product_inventory.entity';
import { ProductHealth } from 'src/product-health/product_health.entity';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  
  @IsOptional()
  description: string;

  // @IsNotEmpty()
  // product_category: ProductCategory;

  // @IsNotEmpty()
  // product_reception: ProductReception;

  // @IsNotEmpty()
  // product_inventory: ProductInventory;

  // @IsNotEmpty()
  // product_health: ProductHealth;

  @IsOptional()
  pictureUrl: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
