import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'aws-sdk/clients/mediaconvert';
import { User } from 'src/auth/user.entity';
import { FileService } from 'src/file/file.service';
import { OrderItemsService } from 'src/order-items/order-items.service';
import { OrderItemsRepository } from 'src/order-items/orders-items.repository';
import { RecipesRepository } from 'src/recipes/recipes.repository';
import { RecipesService } from 'src/recipes/recipes.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import pdfTemplate from './templates';

const pdfParse = require('pdf-parse');
const fs = require('fs').promises;
const pdf = require('html-pdf');

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    @InjectRepository(OrderItemsRepository)
    private orderItemsRepository: OrderItemsRepository,
    @InjectRepository(RecipesRepository)
    private recipesRepository: RecipesRepository,

    private filesServices: FileService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, user: User) {
    // Create order
    const { products, total, customer } = createOrderDto;
    const order = this.ordersRepository.create({
      customer,
      total,
      user,
    });
    await this.ordersRepository.save(order);
    // Create order item
    // products.map(async (p) => {
    //   const orderItem = this.orderItemsRepository.create({
    //     product: p.product,
    //     quantity: p.quantity,
    //     order,
    //   });

    //   const savedItem = await this.orderItemsRepository.save(orderItem);
    // });
    const entities = products.map((p) => ({
      product: p.product,
      quantity: p.quantity,
      order,
    }));

    console.log('ENTITIES ', entities);

    const savedEntities = await this.orderItemsRepository.save(entities);

    console.log('SAVED ENTITIES ', savedEntities);
    // // Generate Invoice
    // const invoice = await this.createOrderPDF(tmpOrder, user);
    // order.invoice = invoice;
    // await this.ordersRepository.save(order);
    return await this.createOrderPDF(order.id, user);
  }

  async fetchOrders(user: User) {
    return this.ordersRepository.find({
      where: {
        user,
      },
      relations: ['customer', 'products', 'products.product'],
    });
  }

  async createOrderPDF(orderId, user: User) {
    console.log('ORDER ORDER ORDER ', orderId);
    const order = await this.ordersRepository.findOne({
      where: { id: orderId, user },
      relations: ['customer', 'products', 'products.product'],
    });
    console.log('ORDER ORDER ORDER ', order);
    return await this.createPdf(order, user);
  }

  createPdf(order, user) {
    return new Promise((resolve, reject) => {
      pdf
        .create(pdfTemplate(order), {})
        .toFile('rezultati.pdf', async (err, res) => {
          if (err) {
            return console.log(err);
          }
          console.log('RES ', res);
          const buffer = await fs.readFile(`./rezultati.pdf`);
          console.log('BUFFER ', buffer);
          const name = order.id + ' invoice.pdf';
          const file = await this.filesServices.uploadPublicFile(
            buffer,
            name,
            'pdf',
            user,
          );

          console.log('INVOICE ', file.url);
          order.invoice = file.url;
          const saved = await this.ordersRepository.save(order);
          if (saved.invoice) {
            resolve(saved);
          }
        });
    });
  }
}
