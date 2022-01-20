import { Exclude, Transform } from 'class-transformer';
import { User } from '../auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from 'src/categories/category.entity';
import * as moment from 'moment';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  // @Column()
  // category: string;

  @Column()
  quantity: number;

  @Column({ type: 'timestamp', nullable: true })
  @Transform(({ obj }) => {
    const start = moment(Date.now());
    const end = moment(obj.expiration_date);
    return start.to(end);
  })
  expiration_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_open: Date;

  @ManyToOne((_type) => User, (user) => user.products, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  // @OneToOne((type) => Category)
  // @JoinColumn()
  // category: string;
  @ManyToOne((type) => Category, (category) => category.products)
  @Transform(({ obj }) => obj.category.name)
  category: Category;
}
