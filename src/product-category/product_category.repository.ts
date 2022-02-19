import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductCategoryDto } from './dtos/create-product_category.dto';
import { ProductCategory } from './product_category.entity';

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends Repository<ProductCategory> {
  async createProductCategory(
    createProductCategoryDto: CreateProductCategoryDto,
    user: User,
  ): Promise<ProductCategory> {
    const { name } = createProductCategoryDto;
    console.log('CATEGORY NAME ', name);
    const productCategory = this.create({
      name,
      user,
    });

    await this.save(productCategory);
    return productCategory;
  }
}
