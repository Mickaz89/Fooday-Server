import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Order } from './order.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { RecipesService } from 'src/recipes/recipes.service';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async createOrder(createOrderDto: CreateOrderDto, user: User) {
    const { products, total, customer } = createOrderDto;

    console.log('products ', products);
    const order = this.create({
      products,
      total,
      customer,
      user,
    });
    return await this.save(order);
  }
}
