import { Injectable } from '@nestjs/common';
import { CreateMeasurementUnitDto } from './dtos/create-measurement-unit.dto';
import { MeasurementUnitsRepository } from './measurement-units.repository';

@Injectable()
export class MeasurementsUnitsService {
  constructor(
    private measurementUnitsReposiytory: MeasurementUnitsRepository,
  ) {}

  async createMeasurementUnit(
    createMeasurementUnitdto: CreateMeasurementUnitDto,
  ) {
    const measurementUnit = this.measurementUnitsReposiytory.create(
      createMeasurementUnitdto,
    );
    return await this.measurementUnitsReposiytory.save(measurementUnit);
  }

  async getAllMeasurementsUnits() {
    return await this.measurementUnitsReposiytory.find({});
  }
}
