import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateIngredientDto } from './dtos/create-ingredient.dto';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
@UseGuards(AuthGuard())
export class IngredientController {
  constructor(private ingredientServices: IngredientService) {}

  @Post()
  createIngredient(
    @Body() createIngredientDto: CreateIngredientDto,
    @GetUser() user: User,
  ) {
    return this.ingredientServices.createIngredient(createIngredientDto, user);
  }
}
