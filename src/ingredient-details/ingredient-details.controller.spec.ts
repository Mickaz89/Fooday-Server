import { Test, TestingModule } from '@nestjs/testing';
import { IngredientDetailsController } from './ingredient-details.controller';

describe('IngredientDetailsController', () => {
  let controller: IngredientDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientDetailsController],
    }).compile();

    controller = module.get<IngredientDetailsController>(IngredientDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
