import { Test, TestingModule } from '@nestjs/testing';
import { ProductReceptionController } from './product-reception.controller';

describe('ProductReceptionController', () => {
  let controller: ProductReceptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductReceptionController],
    }).compile();

    controller = module.get<ProductReceptionController>(ProductReceptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
