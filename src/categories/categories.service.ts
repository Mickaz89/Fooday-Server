import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CategoriesRepository } from './categories.repository';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
    category.user = user;
    return this.categoriesRepository.save(category);
  }

  async getAllCategories(user: User) {
    return this.categoriesRepository.getAllCategories(user);
  }
}
