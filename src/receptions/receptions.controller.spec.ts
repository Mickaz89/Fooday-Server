import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionsController } from './receptions.controller';

describe('ReceptionsController', () => {
  let controller: ReceptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptionsController],
    }).compile();

    controller = module.get<ReceptionsController>(ReceptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
