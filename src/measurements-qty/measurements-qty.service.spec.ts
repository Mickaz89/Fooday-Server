import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementsQtyService } from './measurements-qty.service';

describe('MeasurementsQtyService', () => {
  let service: MeasurementsQtyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasurementsQtyService],
    }).compile();

    service = module.get<MeasurementsQtyService>(MeasurementsQtyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
