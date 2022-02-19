import {
  Body,
  Controller,
  Get,
  Injectable,
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
import { use } from 'passport';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  private logger = new Logger('ProductsController');
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts(@GetUser() user: User) {
    // this.logger.verbose(`User "${user.email}" retrieving all products.`);
    return this.productsService.getAllProducts(user);
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // createProduct(
  //   @Body() createProductDto: CreateProductDto,
  //   @GetUser() user: User,
  //   @UploadedFile() file?: Express.Multer.File,
  // ): Promise<Product> {
  //   console.log('CREATE PRODUCT CONTROLLER', file);
  //   return this.productsService.createProduct(createProductDto, user, file);
  // }

  @Post('create')
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.createProduct(createProductDto);
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
      const obj: any = {};
      const currentline = lines[i].split(';');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      console.log(obj);
      // const categoryId = await this.categoriesService.getCategoryIdByName(
      //   obj.category,
      // );
      // console.log('category id ', categoryId);
      // this.createProduct(product, user);
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
    return this.productsService.addAvatar(file.buffer, file.originalname, user);
  }
  @Post('uploader')
  @UseInterceptors(FileInterceptor('file'))
  async createByFile(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    //Upload file
    // const upload = this.productsService.addAvatar(
    //   file.buffer,
    //   file.originalname,
    //   user,
    // );

    // Get the uploaded file
    // const fileUploaded = await this.productsService.getFile(file.originalname);
    // const fileContent = fileUploaded.Body.toString();
    // console.log('file ', fileContent);
    // const lines = fileContent.split('\r\n');
    // const headers = lines[0].split(';');

    // const result = [];

    // for (let i = 1; i < lines.length; i++) {
    //   const obj = {};
    //   const currentline = lines[i].split(';');

    //   for (let j = 0; j < headers.length; j++) {
    //     obj[headers[j]] = currentline[j];
    //   }

    //   const product = obj as Product;
    //   console.log(obj);

    //   // this.createProduct(product, user);
    //   // result.push(obj);
    //   // this.createProduct(obj)
    // }
    // // console.log('lines ', lines);
    // return fileUploaded;
    // return await this.productsService.createProductsByFile(file, user);
    return false;
  }

  @Post('photo')
  @UseInterceptors(FileInterceptor('image'))
  async addPhoto(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.addAvatar(file.buffer, file.originalname, user);
  }

  // @Get('file')
  // async getFile(@GetUser() user: User) {
  //   const file = await this.productsService.getFile();
  //   const fileContent = file.Body.toString();
  //   console.log('file ', fileContent);
  //   const lines = fileContent.split('\r\n');
  //   const headers = lines[0].split(';');

  //   const result = [];

  //   for (let i = 1; i < lines.length; i++) {
  //     const obj = {};
  //     const currentline = lines[i].split(';');

  //     for (let j = 0; j < headers.length; j++) {
  //       obj[headers[j]] = currentline[j];
  //     }

  //     const product = obj as Product;
  //     console.log(product);
  //     this.createProduct(product, user);
  //     // result.push(obj);
  //     // this.createProduct(obj)
  //   }
  //   return lines;
  // }
}
