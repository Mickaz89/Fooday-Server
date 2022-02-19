import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { FileService } from 'src/file/file.service';
import { ProductCategoryService } from 'src/product-category/product-category.service';
import { ProductCategory } from 'src/product-category/product_category.entity';
import { ProductHealthService } from 'src/product-health/product-health.service';
import { ProductInventoryService } from 'src/product-inventory/product-inventory.service';
import { ProductReceptionService } from 'src/product-reception/product-reception.service';
import { ProductReception } from 'src/product-reception/product_reception.entity';
import { ProductReceptionRepository } from 'src/product-reception/product_reception.repository';
import { Reception } from 'src/receptions/reception.entity';
import { Repository } from 'typeorm';
import { CreateBulkProductsDto } from './dto/create-bulk-products.dto';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
    private readonly filesService: FileService,
    private productCategoryService: ProductCategoryService,
    private productHealthService: ProductHealthService,
    private productInventoryService: ProductInventoryService,
    private productReceptionService: ProductReceptionService,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    return this.productsRepository.createProduct(createProductDto);
  }

  async updateProduct(
    product,
    productReception?,
    productInventory?,
    productHealth?,
  ) {
    // Update product_reception
    // const find = await this.productReceptionService.findById(
    //   productReception.id,
    // );
    // console.log('product reception ', find);
    // find.status = 'delivered';

    return this.productsRepository.updateProduct(
      product,
      productReception,
      productInventory,
      productHealth,
    );
  }

  async findById(id: string) {
    return this.productsRepository.findOne({ id });
  }

  async findByProductReceptionId(id: string) {
    return this.productsRepository.findOne({
      where: { product_reception: id },
    });
  }

  // async createProduct(
  //   createProductDto: CreateProductDto,
  //   user: User,
  //   category: ProductCategory,
  //   reception: ProductReception,
  //   file?: Express.Multer.File,
  // ): Promise<Product> {
  //   console.log('PRODUCT PICTURE ', file);
  //   if (file) {
  //     const productImage = await this.filesService.uploadPublicFile(
  //       file.buffer,
  //       file.originalname,
  //       'csv',
  //       user,
  //     );
  //     createProductDto.pictureUrl = productImage.url;
  //   }
  //   const product = this.productsRepository.create(createProductDto);
  //   // product.user = user;
  //   // product.category = category;
  //   // product.reception = reception;
  //   return this.productsRepository.save(product);
  // }

  async createBulkProducts(
    createBulkProductsDto: CreateBulkProductsDto,
    user: User,
  ) {
    createBulkProductsDto.products.forEach((product) => {
      const addProduct = this.productsRepository.create(product);
      // product.user = user;
      this.productsRepository.save(product);
    });
    return 'good';
    // return this.productsRepository.save(product);
  }

  async getAllProducts(user: User) {
    return this.productsRepository.getAllProducts(user);
  }

  async addAvatar(file: Buffer, filename: string, user: User) {
    const avatar = await this.filesService.uploadPublicFile(
      file,
      filename,
      'image',
      user,
    );
    // const user = await this.getById(userId);
    // await this.usersRepository.update(userId, {
    //   ...user,
    //   avatar
    // });
    return avatar;
  }
  async getFile(filename?: string) {
    const key = await this.filesService.getKey(filename);
    const file = await this.filesService.getPublicFile(key);
    return file;
  }

  async createProductsByFile(
    file: Express.Multer.File,
    user: User,
    reception: Reception,
  ) {
    console.log('RECEPTION RECEPTION ', reception);
    // Upload the file to s3
    await this.addAvatar(file.buffer, file.originalname, user);

    // Fetching the file from s3
    const filename = file.originalname.split('.')[0];
    const fileUploaded = await this.getFile(filename);

    // Reading the file
    const fileContent = fileUploaded.Body.toString();
    console.log('file ', fileContent);
    const lines = fileContent.split('\r\n');
    const headers = lines[0].split(';');

    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj: any = {};
      const currentline = lines[i].split(';');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      // Create the product

      const product = await this.createProduct(obj as Product);

      // Search for product picture by product name
      const name = obj.name as string;

      const pictureUrl = await this.filesService.getFileUrlByName(
        name.toLowerCase(),
      );
      if (pictureUrl) {
        product.pictureUrl = pictureUrl;
      }

      // Search for existing category if not created one
      let category;
      const categoryExist = await this.productCategoryService.findByName(
        obj.category,
      );
      if (categoryExist) {
        category = categoryExist;
      } else {
        category = await this.productCategoryService.create(
          { name: obj.category },
          user,
        );
      }

      // Create product health
      // const productHealth = await this.productHealthService.createProductHealth(
      //   {
      //     expiration_date: obj.expiration_date,
      //     last_open: obj.expiration_date,
      //   },
      //   product,
      // );

      // Create product inventory

      // const productInventory =
      //   await this.productInventoryService.createProductInventory(
      //     { quantity: 50 },
      //     product,
      //   );

      // Create product reception

      const productReception =
        await this.productReceptionService.createProductReception(
          {
            status: 'pending',
            quantity: obj.quantity,
            expiration_date: obj.expiration_date,
          },
          product,
          reception,
        );

      // productReception.reception = reception;
      // await this.productReceptionRepository.save(productReception);

      // product.product_health = productHealth;
      product.product_category = category;
      // product.product_inventory = productInventory;
      product.product_reception = productReception;
      // reception.products.push(productReception);

      await this.productsRepository.save(product);

      // Search for existing product inventory if yes update if not create

      // product.reception_status = 'pending';
      // console.log(obj);
      // const category = await this.categoriesService.getCategoryIdByName(
      //   obj.category,
      // );
      // obj.category = category;
      // obj.reception = reception;
      // console.log('obj after ', obj);
      // await this.createProduct(product, user, category, reception);
      // result.push(obj);
      // this.createProduct(obj)
    }
    // console.log('lines ', lines);
  }
}
