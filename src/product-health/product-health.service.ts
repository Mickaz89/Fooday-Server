import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { CreateProductHealthDto } from './dtos/create-product_health.dto';
import { ProductHealthRepository } from './product_health.repository';

@Injectable()
export class ProductHealthService {
  constructor(
    @InjectRepository(ProductHealthRepository)
    private productHealthRepository: ProductHealthRepository,
  ) {}

  async createProductHealth(
    createProductHealthDto: CreateProductHealthDto,
    product?: Product,
  ) {
    return this.productHealthRepository.createProductHealth(
      createProductHealthDto,
      product,
    );
  }

  async findByProduct(product) {
    return this.productHealthRepository.find({ where: { product } });
  }
}
