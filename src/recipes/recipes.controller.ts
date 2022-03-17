import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { FileService } from 'src/file/file.service';
import { RecipeIngredientsService } from 'src/recipe-ingredients/recipe-ingredients.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
@UseGuards(AuthGuard())
export class RecipesController {
  constructor(
    private recipesServices: RecipesService,
    private recipeIngredientServices: RecipeIngredientsService,
    private fileServices: FileService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @GetUser() user: User,
    @UploadedFile() image: Express.Multer.File,
  ) {
    // Upload Image

    console.log('IMAGE ', image);

    const uploadImage = await this.fileServices.uploadPublicFile(
      image.buffer,
      image.originalname,
      'image',
      user,
    );

    console.log('CREATE RECIPTE DTO ', createRecipeDto);

    // Create the recipe
    const recipe = await this.recipesServices.createRecipe(
      createRecipeDto,
      uploadImage.url,
      user,
    );

    // Create recipeIngredient for each ingredient
    const ingredients = JSON.parse(createRecipeDto.ingredients);
    ingredients.forEach((ingredient) => {
      this.recipeIngredientServices.createRecipeIngredient(ingredient, recipe);
    });

    return recipe;
  }

  @Get()
  findAllRecipes(@GetUser() user: User) {
    return this.recipesServices.findAllRecipes(user);
  }
}
