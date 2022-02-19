import {
  Body,
  Injectable,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ProductsService } from 'src/products/products.service';
import { CreateReceptionDto } from './dtos/create-reception.dto';
import { UpdateReceptionDto } from './dtos/update-reception.dto';
import { ReceptionsRepository } from './receptions.repository';

@Injectable()
export class ReceptionsService {
  constructor(
    private receptionsRepository: ReceptionsRepository,
    private productsService: ProductsService,
  ) {}
  async create(
    file: Express.Multer.File,
    body: CreateReceptionDto,
    user: User,
  ) {
    body.status = 'pending';
    console.log('BODY ', body);
    const reception = this.receptionsRepository.create(body);
    reception.user = user;
    this.receptionsRepository.save(reception);
    try {
      this.productsService.createProductsByFile(file, user, reception);
      return reception;
    } catch (err) {
      return 'error';
    }
  }

  async getAllReceptions(user: User, query) {
    const where = {} as any;
    where.user = user;

    for (const property in query) {
      console.log(`${property}: ${query[property]}`);
      where[property] = query[property];
    }
    return this.receptionsRepository.find({
      relations: [
        'products',
        'products.product',
        'products.product.product_inventory',
        'products.product.product_health',
        // 'products.product_category',
        // 'products.product_inventory',
        // 'products.product_health',
        // 'products.product_reception',
      ],
      where,
    });
  }

  async getReception(id: string, user: User) {
    try {
      console.log('ID ID ID ', id);
      return await this.receptionsRepository.findOne({
        where: { id, user },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async updateReception(
    id: string,
    user: User,
    updateReceptionDto: UpdateReceptionDto,
  ) {
    const found = await this.getReception(id, user);
    console.log('FOUND RECEPTION ', found);
    for (const property in updateReceptionDto) {
      // console.log(`${property}: ${updateProductDto[property]}`);
      found[property] = updateReceptionDto[property];
    }
    return await this.receptionsRepository.save(found);
  }
}
