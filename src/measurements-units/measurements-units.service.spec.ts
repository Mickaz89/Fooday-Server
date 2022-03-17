import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementsUnitsService } from './measurements-units.service';

describe('MeasurementsUnitsService', () => {
  let service: MeasurementsUnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasurementsUnitsService],
    }).compile();

    service = module.get<MeasurementsUnitsService>(MeasurementsUnitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
