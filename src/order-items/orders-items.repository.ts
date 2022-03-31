import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrderItem } from './order-item.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-items.dto';

@EntityRepository(OrderItem)
export class OrderItemsRepository extends Repository<OrderItem> {

  async createOrderItem(createOrderItemDto: any) {
    const { product, quantity, order } = createOrderItemDto;
    const orderItem = this.create({
      product,
      quantity,
      order,
    });
  }
}
