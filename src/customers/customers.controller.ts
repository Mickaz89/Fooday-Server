import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
@UseGuards(AuthGuard())
export class CustomersController {
  constructor(private customersServices: CustomersService) {}

  @Post()
  createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    @GetUser() user: User,
  ) {
    return this.customersServices.createCustomer(createCustomerDto, user);
  }

  @Get()
  fetchCustomers(@GetUser() user: User) {
    return this.customersServices.fetchCustomers(user);
  }
}
