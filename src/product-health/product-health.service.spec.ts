import { Test, TestingModule } from '@nestjs/testing';
import { ProductHealthService } from './product-health.service';

describe('ProductHealthService', () => {
  let service: ProductHealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductHealthService],
    }).compile();

    service = module.get<ProductHealthService>(ProductHealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
