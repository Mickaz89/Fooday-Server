import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductReceptionController } from './product-reception.controller';
import { ProductReceptionService } from './product-reception.service';
import { ProductReceptionRepository } from './product_reception.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReceptionRepository]), AuthModule],
  controllers: [ProductReceptionController],
  providers: [ProductReceptionService],
  exports: [ProductReceptionService],
})
export class ProductReceptionModule {}
