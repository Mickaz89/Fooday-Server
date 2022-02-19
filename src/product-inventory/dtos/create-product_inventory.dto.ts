import { IsNotEmpty } from 'class-validator';
export class CreateProductInventoryDto {
  @IsNotEmpty()
  quantity: number;
}
