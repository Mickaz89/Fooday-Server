import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductHealthController } from './product-health.controller';
import { ProductHealthService } from './product-health.service';
import { ProductHealthRepository } from './product_health.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductHealthRepository]), AuthModule],
  controllers: [ProductHealthController],
  providers: [ProductHealthService],
  exports: [ProductHealthService],
})
export class ProductHealthModule {}
