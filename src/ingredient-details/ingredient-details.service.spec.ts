import { Test, TestingModule } from '@nestjs/testing';
import { IngredientDetailsService } from './ingredient-details.service';

describe('IngredientDetailsService', () => {
  let service: IngredientDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientDetailsService],
    }).compile();

    service = module.get<IngredientDetailsService>(IngredientDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
