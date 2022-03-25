import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  buildingType: string;

  @IsString()
  @IsOptional()
  floor: string;

  @IsString()
  @IsOptional()
  appartment: string;
}
