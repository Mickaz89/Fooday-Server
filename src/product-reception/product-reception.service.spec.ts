import { Test, TestingModule } from '@nestjs/testing';
import { ProductReceptionService } from './product-reception.service';

describe('ProductReceptionService', () => {
  let service: ProductReceptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductReceptionService],
    }).compile();

    service = module.get<ProductReceptionService>(ProductReceptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
