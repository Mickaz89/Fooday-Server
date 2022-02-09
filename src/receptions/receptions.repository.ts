import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Reception } from './reception.entity';

@EntityRepository(Reception)
export class ReceptionsRepository extends Repository<Reception> {}
