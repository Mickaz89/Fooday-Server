import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  private logger = new Logger('ProductsRepository', true);

  async getAllCategories(user: User): Promise<Category[]> {
    const query = this.createQueryBuilder('category');
    query.where({ user });
    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      this.logger.error(
        `Failed to get products for user "${user.email}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
