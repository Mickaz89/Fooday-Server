import { Exclude, Transform } from 'class-transformer';
import { User } from '../auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/products/product.entity';
import * as moment from 'moment';
import { ProductReception } from 'src/product-reception/product_reception.entity';

const date = new Date();

@Entity()
export class Reception {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reference: string;

  @Column({ type: 'timestamp', nullable: true })
  // @Transform(({ obj }) => {
  //   const start = moment(Date.now());
  //   const end = moment(obj.delivery_date);
  //   return start.to(end);
  // })
  delivery_date: Date;

  @CreateDateColumn()
  created_date: Date;

  @OneToMany(
    (type) => ProductReception,
    (product_reception) => product_reception.reception,
  )
  products: ProductReception[];

  @ManyToOne((_type) => User, (user) => user.receptions, { eager: false })
  user: User;

  @Column()
  status: string;

  @Column()
  supplier: string;
}
