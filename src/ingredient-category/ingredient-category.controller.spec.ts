import { Test, TestingModule } from '@nestjs/testing';
import { IngredientCategoryController } from './ingredient-category.controller';

describe('IngredientCategoryController', () => {
  let controller: IngredientCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientCategoryController],
    }).compile();

    controller = module.get<IngredientCategoryController>(IngredientCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
