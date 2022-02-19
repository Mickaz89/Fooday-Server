import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductHealthDto } from './dtos/create-product_health.dto';
import { ProductHealthService } from './product-health.service';

@Controller('product-health')
export class ProductHealthController {
  constructor(private productHealthServices: ProductHealthService) {}
  @Post('create')
  async createProductCategory(
    @Body() createProductHealthDto: CreateProductHealthDto,
  ) {
    return this.productHealthServices.createProductHealth(
      createProductHealthDto,
    );
  }
}
