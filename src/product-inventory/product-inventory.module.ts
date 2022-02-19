import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductInventoryController } from './product-inventory.controller';
import { ProductInventoryService } from './product-inventory.service';
import { ProductInventoryRepository } from './product_inventory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductInventoryRepository]), AuthModule],
  controllers: [ProductInventoryController],
  providers: [ProductInventoryService],
  exports: [ProductInventoryService],
})
export class ProductInventoryModule {}
