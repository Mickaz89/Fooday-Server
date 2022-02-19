import { Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProductInventoryDto } from './dtos/create-product_inventory.dto';
import { ProductInventoryService } from './product-inventory.service';

@Controller('product-inventory')
export class ProductInventoryController {
  constructor(private productInventoryServices: ProductInventoryService) {}
  @Post('create')
  async createProductCategory(
    @Body() createProductInventoryDto: CreateProductInventoryDto,
  ) {
    return this.productInventoryServices.createProductInventory(
      createProductInventoryDto,
    );
  }
}
