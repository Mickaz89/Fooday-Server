import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementsQtyController } from './measurements-qty.controller';

describe('MeasurementsQtyController', () => {
  let controller: MeasurementsQtyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasurementsQtyController],
    }).compile();

    controller = module.get<MeasurementsQtyController>(MeasurementsQtyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
