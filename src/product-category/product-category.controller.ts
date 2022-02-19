import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProductCategoryDto } from './dtos/create-product_category.dto';
import { ProductCategoryService } from './product-category.service';

@Controller('product-category')
@UseGuards(AuthGuard())
export class ProductCategoryController {
  constructor(private productCategoryService: ProductCategoryService) {}
  @Post('create')
  async createProductCategory(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
    @GetUser() user: User,
  ) {
    return this.productCategoryService.create(createProductCategoryDto, user);
  }

  @Get('/')
  async getAllProductCategories(@GetUser() user: User) {
    return this.productCategoryService.findAll(user);
  }
}
