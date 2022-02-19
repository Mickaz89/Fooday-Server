import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductCategoryModule } from 'src/product-category/product-category.module';
import { ProductHealthModule } from 'src/product-health/product-health.module';
import { ProductInventoryModule } from 'src/product-inventory/product-inventory.module';
import { ProductsModule } from 'src/products/products.module';
import { ReceptionsController } from './receptions.controller';
import { ReceptionsRepository } from './receptions.repository';
import { ReceptionsService } from './receptions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceptionsRepository]),
    AuthModule,
    ProductsModule,
    ProductCategoryModule,
    ProductInventoryModule,
    ProductHealthModule,
  ],
  controllers: [ReceptionsController],
  providers: [ReceptionsService],
})
export class ReceptionsModule {}
