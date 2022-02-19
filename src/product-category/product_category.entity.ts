import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/products/product.entity';
import { User } from 'src/auth/user.entity';
import { userInfo } from 'os';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.product_category)
  product: Product;

  @ManyToOne(() => User, (user) => user.categories)
  @Exclude()
  user: User;
}
