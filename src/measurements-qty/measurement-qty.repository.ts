import { EntityRepository, Repository } from 'typeorm';
import { MeasurementQty } from './measurement-qty.entity';

@EntityRepository(MeasurementQty)
export class MeasurmentQtyRepository extends Repository<MeasurementQty> {}
