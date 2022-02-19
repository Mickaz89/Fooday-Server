import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateProductCategoryDto } from './dtos/create-product_category.dto';
import { ProductCategoryRepository } from './product_category.repository';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategoryRepository)
    private productCategoryRepository: ProductCategoryRepository,
  ) {}

  async create(createProductCategoryDto: CreateProductCategoryDto, user: User) {
    return this.productCategoryRepository.createProductCategory(
      createProductCategoryDto,
      user,
    );
  }

  async findByName(name: string) {
    return this.productCategoryRepository.findOne({ where: { name } });
  }

  async findById(id: string) {
    return this.productCategoryRepository.findOne({ where: { id } });
  }

  async findAll(user: User) {
    return this.productCategoryRepository.find({ where: { user } });
  }
}
