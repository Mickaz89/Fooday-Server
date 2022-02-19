import { Product } from 'src/products/product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductInventoryDto } from './dtos/create-product_inventory.dto';
import { ProductInventory } from './product_inventory.entity';

@EntityRepository(ProductInventory)
export class ProductInventoryRepository extends Repository<ProductInventory> {
  async createProductInventory(
    createProductInventoryDto: CreateProductInventoryDto,
    product: Product
  ): Promise<ProductInventory> {
    const { quantity } = createProductInventoryDto;

    const productInventory = this.create({
      quantity,
      product
    });

    await this.save(productInventory);
    return productInventory;
  }
}
