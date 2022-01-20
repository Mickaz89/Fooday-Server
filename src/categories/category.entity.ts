import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/products/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

//   @ManyToMany((_type) => Product, (product) => product.category, {
//     eager: false,
//   })
//   @Exclude({ toPlainOnly: true })
//   products: Product[];

  @OneToMany((type) => Product, (product) => product.category)
  products: Product[];

  @ManyToOne((_type) => User, (user) => user.categories, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
