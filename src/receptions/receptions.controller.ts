import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Console } from 'console';
import { userInfo } from 'os';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ProductHealthService } from 'src/product-health/product-health.service';
import { ProductInventoryService } from 'src/product-inventory/product-inventory.service';
import { ProductsService } from 'src/products/products.service';
import { CreateReceptionDto } from './dtos/create-reception.dto';
import { UpdateReceptionDto } from './dtos/update-reception.dto';
import { ReceptionsService } from './receptions.service';

@UseGuards(AuthGuard())
@Controller('receptions')
export class ReceptionsController {
  constructor(
    private receptionsService: ReceptionsService,
    private productServices: ProductsService,
    private productInventoryService: ProductInventoryService,
    private productHealthService: ProductHealthService,
  ) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createNewReception(
    @Body() body: CreateReceptionDto,
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.receptionsService.create(file, body, user);
  }

  @Patch('update')
  async updateReception(
    // @Query('id') id: string,
    @Body() updateReceptionDto: UpdateReceptionDto,
    @GetUser() user: User,
  ) {
    console.log('UPDATE RECEPTION ', updateReceptionDto.productsReception);
    updateReceptionDto.productsReception.forEach(async (productReception) => {
      // Find corresponding product of product_reception
      console.log('PRODUCT RECEPTION ', productReception);
      const product = await this.productServices.findByProductReceptionId(
        productReception.id,
      );
      console.log(product);

      // Update product_reception status
      productReception.status = 'approved';

      // Check if product inventory already exist
      let productInventory;
      const existProductInventory =
        await this.productInventoryService.findByProduct(product);
      console.log('INVENTORY ALREADY EXIST ', existProductInventory);

      if (existProductInventory[0]) {
        console.log('EXIST PRODUCT INVENTORY ', existProductInventory);
        productInventory = {
          quantity:
            existProductInventory[0].quantity + productReception.quantity,
        };
      } else {
        // Create productInventory and assign it the quantity approved on  product_reception
        productInventory =
          await this.productInventoryService.createProductInventory(
            { quantity: productReception.quantity },
            product,
          );
      }

      // Check if product health already exist
      let productHealth;
      const existProductHealth = await this.productHealthService.findByProduct(
        product,
      );

      if (existProductHealth[0]) {
        console.log('EXIST PRODUCT INVENTORY ', existProductHealth);
      } else {
        // Create product health and assign it the expiration_date approved on  roduct_reception

        productHealth = await this.productHealthService.createProductHealth(
          {
            expiration_date: productReception.expiration_date,
          },
          product,
        );

        console.log('PRODUCT HEALTH  ', productHealth);
      }

      await this.productServices.updateProduct(
        product,
        productReception,
        productInventory,
        productHealth,
      );
    });

    console.log(
      ' UPDATE RECEPTION ID',
      updateReceptionDto.productsReception[0].reception.id,
    );
    const id = updateReceptionDto.productsReception[0].reception.id;
    return this.receptionsService.updateReception(id, user, {
      status: 'delivered',
    });
  }

  @Get('/')
  async getAllReceptions(@GetUser() user: User, @Query() query) {
    console.log('query ', query);
    return await this.receptionsService.getAllReceptions(user, query);
  }
}
