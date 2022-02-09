import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/category.entity';
import { FileService } from 'src/file/file.service';
import { Reception } from 'src/receptions/reception.entity';
import { Repository } from 'typeorm';
import { CreateBulkProductsDto } from './dto/create-bulk-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
    private readonly filesService: FileService,
    private categoriesService: CategoriesService,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
    category: Category,
    reception: Reception,
    file?: Express.Multer.File,
  ): Promise<Product> {
    console.log('PRODUCT PICTURE ', file);
    if (file) {
      const productImage = await this.filesService.uploadPublicFile(
        file.buffer,
        file.originalname,
        user,
      );
      createProductDto.pictureUrl = productImage.url;
    }
    const product = this.productsRepository.create(createProductDto);
    product.user = user;
    product.category = category;
    product.reception = reception;
    return this.productsRepository.save(product);
  }

  async createBulkProducts(
    createBulkProductsDto: CreateBulkProductsDto,
    user: User,
  ) {
    createBulkProductsDto.products.forEach((product) => {
      const addProduct = this.productsRepository.create(product);
      product.user = user;
      this.productsRepository.save(product);
    });
    return 'good';
    // return this.productsRepository.save(product);
  }

  async getAllProducts(user: User) {
    return this.productsRepository.getAllProducts(user);
  }

  async addAvatar(file: Buffer, filename: string, user: User) {
    const avatar = await this.filesService.uploadPublicFile(
      file,
      filename,
      user,
    );
    // const user = await this.getById(userId);
    // await this.usersRepository.update(userId, {
    //   ...user,
    //   avatar
    // });
    return avatar;
  }
  async getFile(filename?: string) {
    const key = await this.filesService.getKey(filename);
    const file = await this.filesService.getPublicFile(key);
    return file;
  }

  async createProductsByFile(
    file: Express.Multer.File,
    user: User,
    reception: Reception,
  ) {
    // Upload the file to s3
    await this.addAvatar(file.buffer, file.originalname, user);

    // Fetching the file from s3
    const fileUploaded = await this.getFile(file.originalname);

    // Reading the file
    const fileContent = fileUploaded.Body.toString();
    console.log('file ', fileContent);
    const lines = fileContent.split('\r\n');
    const headers = lines[0].split(';');

    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj: any = {};
      const currentline = lines[i].split(';');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      const product = obj as Product;
      // console.log(obj);
      const category = await this.categoriesService.getCategoryIdByName(
        obj.category,
      );
      // obj.category = category;
      // obj.reception = reception;
      console.log('obj after ', obj);
      await this.createProduct(product, user, category, reception);
      // result.push(obj);
      // this.createProduct(obj)
    }
    // console.log('lines ', lines);
  }
}
