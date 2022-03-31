import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Customer } from 'src/customers/customers.entity';
import { Order } from 'src/orders/order.entity';
import { Recipes } from 'src/recipes/recipes.entity';

export class CreateOrderItemDto {
  @IsString()
  quantity: number;

  @IsNotEmpty()
  product;

  @IsNotEmpty()
  order: Order;
}
