import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MeasurementUnitsRepository } from './measurement-units.repository';
import { MeasurementsUnitsController } from './measurements-units.controller';
import { MeasurementsUnitsService } from './measurements-units.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeasurementUnitsRepository]), AuthModule],
  providers: [MeasurementsUnitsService],
  controllers: [MeasurementsUnitsController],
})
export class MeasurementsUnitsModule {}
