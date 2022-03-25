import { Task } from '../tasks/task.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/products/product.entity';
import PublicFile from 'src/file/publicFile.entity';
import { Reception } from 'src/receptions/reception.entity';
import { ProductCategory } from 'src/product-category/product_category.entity';
import { Meal } from 'src/meal/meal.entity';
import { Ingredient } from 'src/ingredient/ingredient.entity';
import { Recipes } from 'src/recipes/recipes.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  buildingType: string;

  @Column({ nullable: true })
  floor: string;

  @Column({ nullable: true })
  appartment: string;

  @ManyToOne(() => User, (user) => user.customers, { eager: false })
  user: User;
}
