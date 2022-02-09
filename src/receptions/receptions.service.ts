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

  async getAllReceptions(user: User) {
    return this.receptionsRepository.find({
      relations: ['products', 'products.category'],
      where: { user },
    });
  }
}
