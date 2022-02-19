import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  // private logger = new Logger('ProductsRepository', true);

  async createProduct(createProductDto: CreateProductDto) {
    const { name, description, pictureUrl } = createProductDto;

    const product = this.create({
      name,
      description,
      pictureUrl,
    });

    await this.save(product);
    return product;
  }

  async updateProduct(
    product,
    productReception,
    productInventory,
    productHealth,
  ) {
    const { id } = product;

    try {
      await this.save({
        id,
        product_reception: productReception,
        product_inventory: productInventory,
        product_health: productHealth,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getAllProducts(user: User): Promise<Product[]> {
    const query = this.createQueryBuilder('product');
    query.leftJoinAndSelect('product.category', 'category');
    query.where({ user });

    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      // this.logger.error(
      //   `Failed to get products for user "${user.email}".`,
      //   error.stack,
      // );
      throw new InternalServerErrorException();
    }
  }
}
