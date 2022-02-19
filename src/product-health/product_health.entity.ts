import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as moment from 'moment';
import { Product } from 'src/products/product.entity';

@Entity()
export class ProductHealth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  expiration_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_open: Date;

  @OneToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product;
}
