import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInventoryRepository } from 'src/product-inventory/product_inventory.repository';
import { UpdateProductDto } from 'src/products/dto/create-product.dto';
import { Product } from 'src/products/product.entity';
import { Reception } from 'src/receptions/reception.entity';
import {
  CreateProductReceptionDto,
  UpdateProductReceptionDto,
} from './dtos/create-product-reception.dto';
import { ProductReceptionRepository } from './product_reception.repository';

@Injectable()
export class ProductReceptionService {
  constructor(
    @InjectRepository(ProductReceptionRepository)
    private productReceptionRepository: ProductReceptionRepository,
  ) {}

  async createProductReception(
    createProductReceptionDto: CreateProductReceptionDto,
    product?: Product,
    reception?: Reception,
  ) {
    return this.productReceptionRepository.createProductReception(
      createProductReceptionDto,
      product,
      reception,
    );
  }
  async updateProductReception(
    updateProductReceptionDto?: UpdateProductReceptionDto,
  ) {
    return this.productReceptionRepository.updateProductReception(
      updateProductReceptionDto,
    );
  }

  async findById(id: string) {
    return this.productReceptionRepository.findOne({ id });
  }
}
