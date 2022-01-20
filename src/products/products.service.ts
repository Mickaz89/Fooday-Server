import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { FileService } from 'src/file/file.service';
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
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    product.user = user;
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

  async addAvatar(file: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(file, filename);
    // const user = await this.getById(userId);
    // await this.usersRepository.update(userId, {
    //   ...user,
    //   avatar
    // });
    return avatar;
  }
  async getFile() {
    const file = await this.filesService.getPublicFile();
    return file;
  }
}
