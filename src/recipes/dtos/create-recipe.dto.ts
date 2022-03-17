import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  servingSize: number;

  @IsNotEmpty()
  cookingTime: number;

  @IsNotEmpty()
  ingredients: string;

  // @IsOptional()
  // image: Express.Multer.File;

  // {
  //   id: 601329be-f13a-459f-91ef-74a282c78434,
  //   qty: 10,
  //   unitId: 24153b9d-fdfc-4a53-8d31-c0d3d3907283

  // }
}
