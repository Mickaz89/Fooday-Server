import { Injectable } from '@nestjs/common';
import { create } from 'domain';
import { CreateOrderItemDto } from './dto/create-order-items.dto';
import { OrderItemsRepository } from './orders-items.repository';

@Injectable()
export class OrderItemsService {
  constructor(private orderItemsRepository: OrderItemsRepository) {}

  createOrderItem(createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsRepository.createOrderItem(createOrderItemDto);
  }
}
