import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Customer } from 'src/customers/customers.entity';
import { OrderItem } from 'src/order-items/order-item.entity';
import { Recipes } from 'src/recipes/recipes.entity';

export class CreateOrderDto {
  @IsString()
  total: string;

  @IsArray()
  products: OrderItem[];

  @IsString()
  customer: Customer;
}
