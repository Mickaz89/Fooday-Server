import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';
import { ReceptionsController } from './receptions.controller';
import { ReceptionsRepository } from './receptions.repository';
import { ReceptionsService } from './receptions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceptionsRepository]),
    AuthModule,
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [ReceptionsController],
  providers: [ReceptionsService],
})
export class ReceptionsModule {}
