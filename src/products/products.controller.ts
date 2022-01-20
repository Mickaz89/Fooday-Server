import {
  Body,
  Controller,
  Get,
  Logger,
  ParseArrayPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { CreateBulkProductsDto } from './dto/create-bulk-products.dto';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  private logger = new Logger('ProductsController');
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts(@GetUser() user: User) {
    // this.logger.verbose(`User "${user.email}" retrieving all products.`);
    console.log('current user ', user && user);
    return this.productsService.getAllProducts(user);
  }

  @Post()
  createProduct(
    @Body() createTaskDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    this.logger.verbose(
      `User "${user.email}" creating a new task. Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this.productsService.createProduct(createTaskDto, user);
  }
  @Post('bulk')
  createBulkProducts(
    @Body() createBulkProductsDto: CreateBulkProductsDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(
      `User "${user.email}" creating a new task. Data: ${JSON.stringify(
        createBulkProductsDto,
      )}`,
    );
    return this.productsService.createBulkProducts(createBulkProductsDto, user);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/products/files',
        filename: function (req, file, cb) {
          cb(null, 'products.csv');
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    const csvFile = readFileSync('./src/products/files/products.csv');
    const csvData = csvFile.toString();
    console.log(file);

    const lines = csvData.split('\r\n');

    const result = [];

    const headers = lines[0].split(';');

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(';');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      const product = obj as Product;
      console.log(product);
      this.createProduct(product, user);
      // result.push(obj);
      // this.createProduct(obj)
    }
  }
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
  
    return this.productsService.addAvatar(file.buffer, file.originalname);
  }
  @Get('file')
  async getFile(@GetUser() user: User) {
    const file = await this.productsService.getFile();
    const fileContent = file.Body.toString();
    console.log('file ', fileContent);
    const lines = fileContent.split('\r\n');
    const headers = lines[0].split(';');

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(';');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      const product = obj as Product;
      console.log(product);
      // this.createProduct(product, user);
      // result.push(obj);
      // this.createProduct(obj)
    }
    return lines;
  }
}
