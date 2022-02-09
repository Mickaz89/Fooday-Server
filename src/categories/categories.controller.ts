import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Controller('categories')
@UseGuards(AuthGuard())
export class CategoriesController {
  private logger = new Logger('ProductsController');
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  getCategories(@GetUser() user: User) {
    return this.categoriesService.getAllCategories(user);
  }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    this.logger.verbose(
      `User "${user.email}" creating a new task. Data: ${JSON.stringify(
        createCategoryDto,
      )}`,
    );
    return this.categoriesService.createCategory(createCategoryDto, user);
  }
}
