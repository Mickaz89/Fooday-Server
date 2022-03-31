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
import { Order } from 'src/orders/order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.products, {
    eager: false,
  })
  order: Order;

  @ManyToOne(() => Recipes, (products) => products.order, {
    eager: false,
    cascade: true,
  })
  product: Recipes;

  // @OneToOne(() => Recipes)
  // @JoinColumn()
  // product: Recipes;
}
