import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { pbkdf2 } from 'crypto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { FileService } from 'src/file/file.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
const pdfParse = require('pdf-parse');
const fs = require('fs');
const pdf = require('html-pdf');

import pdfTemplate from './templates';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(
    private ordersServices: OrdersService,
    private filesServices: FileService,
  ) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ) {
    return await this.ordersServices.createOrder(createOrderDto, user);
  }

  @Post('create-pdf')
  async createOrderPDF(@Body() order: any, @GetUser() user: User) {
    console.log('BODY BODY ', order);
    // pdf.create(pdfTemplate(body), {}).toFile('rezultati.pdf', async (err) => {
    //   if (err) {
    //     return console.log(err);
    //   }
    // });
    // const buffer = fs.readFileSync(`./rezultati.pdf`);
    // console.log('BUFFER ', buffer);
    // const name = user + ' invoice.pdf';
    // const file = await this.filesServices.uploadPublicFile(
    //   buffer,
    //   name,
    //   'pdf',
    //   user,
    // );
    return this.ordersServices.createOrderPDF(order.order, user);
  }

  @Get()
  fetchOrders(@GetUser() user: User) {
    return this.ordersServices.fetchOrders(user);
  }
}
