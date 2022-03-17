import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementsUnitsController } from './measurements-units.controller';

describe('MeasurementsUnitsController', () => {
  let controller: MeasurementsUnitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasurementsUnitsController],
    }).compile();

    controller = module.get<MeasurementsUnitsController>(MeasurementsUnitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
