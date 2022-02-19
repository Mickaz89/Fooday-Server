import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { UpdateProductDto } from 'src/products/dto/create-product.dto';
import { Product } from 'src/products/product.entity';
import { Reception } from 'src/receptions/reception.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductReceptionDto, UpdateProductReceptionDto } from './dtos/create-product-reception.dto';
import { ProductReception } from './product_reception.entity';

@EntityRepository(ProductReception)
export class ProductReceptionRepository extends Repository<ProductReception> {
  async createProductReception(
    createProductReceptionDto: CreateProductReceptionDto,
    product: Product,
    reception ?: Reception,
  ): Promise<ProductReception> {
    const { status, quantity, expiration_date } = createProductReceptionDto;

    const productReception = this.create({
      status,
      quantity,
      expiration_date,
      product,
      reception,
    });

    await this.save(productReception);
    return productReception;
  }
  async updateProductReception(
    updateProductReceptionDto: UpdateProductReceptionDto,
  ): Promise<ProductReception> {
    const { status, quantity } = updateProductReceptionDto;

    const productReception = this.create({
      status,
      quantity,
    });

    await this.save(productReception);
    return productReception;
  }
}
