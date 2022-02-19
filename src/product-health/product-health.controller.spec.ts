import { Test, TestingModule } from '@nestjs/testing';
import { ProductHealthController } from './product-health.controller';

describe('ProductHealthController', () => {
  let controller: ProductHealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductHealthController],
    }).compile();

    controller = module.get<ProductHealthController>(ProductHealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
