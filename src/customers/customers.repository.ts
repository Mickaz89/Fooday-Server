import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Customer } from './customers.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {
  async createCustomer(createCustomerDto: CreateCustomerDto, user: User) {
    const { email, name, phone, address, buildingType, floor, appartment } =
      createCustomerDto;

    const customer = this.create({
      email,
      name,
      phone,
      address,
      buildingType,
      floor,
      appartment,
      user,
    });

    return await this.save(customer);
  }
}
