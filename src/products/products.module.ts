import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';
import { ProductCategoryModule } from 'src/product-category/product-category.module';
import { ProductCategoryService } from 'src/product-category/product-category.service';
import { ProductHealthModule } from 'src/product-health/product-health.module';
import { ProductHealthService } from 'src/product-health/product-health.service';
import { ProductInventoryModule } from 'src/product-inventory/product-inventory.module';
import { ProductInventoryService } from 'src/product-inventory/product-inventory.service';
import { ProductReceptionModule } from 'src/product-reception/product-reception.module';
import { ProductReceptionService } from 'src/product-reception/product-reception.service';
import { ProductReceptionRepository } from 'src/product-reception/product_reception.repository';
import { Product } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository]),
    AuthModule,
    FileModule,
    ProductCategoryModule,
    ProductHealthModule,
    ProductInventoryModule,
    ProductReceptionModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
