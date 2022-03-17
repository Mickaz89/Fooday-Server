import { EntityRepository, Repository } from 'typeorm';
import { MeasurementUnits } from './measurement-units.entity';

@EntityRepository(MeasurementUnits)
export class MeasurementUnitsRepository extends Repository<MeasurementUnits> {}
