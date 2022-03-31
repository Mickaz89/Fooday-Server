import { Task } from '../tasks/task.entity';
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
  UpdateDateColumn,
} from 'typeorm';
import { Product } from 'src/products/product.entity';
import PublicFile from 'src/file/publicFile.entity';
import { Reception } from 'src/receptions/reception.entity';
import { ProductCategory } from 'src/product-category/product_category.entity';
import { Meal } from 'src/meal/meal.entity';
import { Ingredient } from 'src/ingredient/ingredient.entity';
import { Recipes } from 'src/recipes/recipes.entity';
import { User } from 'src/auth/user.entity';
import { Customer } from 'src/customers/customers.entity';
import { OrderItem } from 'src/order-items/order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  total: string;

  @ManyToOne(() => Customer, (customer) => customer.orders, { eager: false })
  customer: Customer;

  // @ManyToMany(() => OrderItem)
  // @JoinTable()
  // products: OrderItem[];

  @OneToMany((_type) => OrderItem, (products) => products.order, {
    eager: true,
  })
  @JoinColumn()
  products: OrderItem[];

  @ManyToOne(() => User, (user) => user.customers, { eager: false })
  user: User;

  @Column({ nullable: true })
  invoice: string;
}
