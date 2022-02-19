import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { CreateProductInventoryDto } from './dtos/create-product_inventory.dto';
import { ProductInventoryRepository } from './product_inventory.repository';

@Injectable()
export class ProductInventoryService {
  constructor(
    @InjectRepository(ProductInventoryRepository)
    private productInventoryRepository: ProductInventoryRepository,
  ) {}

  async createProductInventory(
    createProductInventoryDto: CreateProductInventoryDto,
    product?: Product,
  ) {
    return this.productInventoryRepository.createProductInventory(
      createProductInventoryDto,
      product,
    );
  }

  async findByProduct(product) {
    return this.productInventoryRepository.find({ where: { product } });
  }
}
