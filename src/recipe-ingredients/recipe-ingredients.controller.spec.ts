import { Test, TestingModule } from '@nestjs/testing';
import { RecipeIngredientsController } from './recipe-ingredients.controller';

describe('RecipeIngredientsController', () => {
  let controller: RecipeIngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeIngredientsController],
    }).compile();

    controller = module.get<RecipeIngredientsController>(
      RecipeIngredientsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
