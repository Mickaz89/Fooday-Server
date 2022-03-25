import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomersRepository)
    private customersRepository: CustomersRepository,
  ) {}

  createCustomer(createCustomerDto: CreateCustomerDto, user: User) {
    return this.customersRepository.createCustomer(createCustomerDto, user);
  }

  async fetchCustomers(user) {
    return await this.customersRepository.find({ where: { user } });
  }
}
