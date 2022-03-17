import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMeasurementUnitDto } from './dtos/create-measurement-unit.dto';
import { MeasurementsUnitsService } from './measurements-units.service';

@Controller('measurements-units')
export class MeasurementsUnitsController {
  constructor(private measurementUnitsServices: MeasurementsUnitsService) {}
  @Post()
  createMeasurementUnit(
    @Body() createMeasurementUnitdto: CreateMeasurementUnitDto,
  ) {
    return this.measurementUnitsServices.createMeasurementUnit(
      createMeasurementUnitdto,
    );
  }

  @Get()
  getAllMeasurementsUnits() {
    return this.measurementUnitsServices.getAllMeasurementsUnits();
  }
}
