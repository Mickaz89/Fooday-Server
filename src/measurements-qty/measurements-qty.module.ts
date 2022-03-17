import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MeasurmentQtyRepository } from './measurement-qty.repository';
import { MeasurementsQtyController } from './measurements-qty.controller';
import { MeasurementsQtyService } from './measurements-qty.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeasurmentQtyRepository]), AuthModule],
  providers: [MeasurementsQtyService],
  controllers: [MeasurementsQtyController],
})
export class MeasurementsQtyModule {}
