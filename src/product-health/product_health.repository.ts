import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Product } from 'src/products/product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductHealthDto } from './dtos/create-product_health.dto';
import { ProductHealth } from './product_health.entity';

@EntityRepository(ProductHealth)
export class ProductHealthRepository extends Repository<ProductHealth> {
  async createProductHealth(
    createProductHealthDto: CreateProductHealthDto,
    product: Product,
  ): Promise<ProductHealth> {
    const { expiration_date } = createProductHealthDto;

    const productHealth = this.create({
      expiration_date,
      product,
    });

    await this.save(productHealth);
    return productHealth;
  }
}
