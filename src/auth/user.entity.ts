import { Task } from '../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/products/product.entity';
import { Category } from 'src/categories/category.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  @OneToMany((_type) => Product, (product) => product.user, { eager: true })
  products: Product[];

  @OneToMany((_type) => Category, (category) => category.user, { eager: true })
  categories: Category[];
}
