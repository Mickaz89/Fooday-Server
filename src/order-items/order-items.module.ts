import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsController } from './order-items.controller';
import { OrderItemsService } from './order-items.service';
import { OrderItemsRepository } from './orders-items.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemsRepository])],
  providers: [OrderItemsService],
  controllers: [OrderItemsController],
  exports: [TypeOrmModule],
})
export class OrderItemsModule {}
