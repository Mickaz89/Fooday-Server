import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  // private logger = new Logger('ProductsRepository', true);

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
