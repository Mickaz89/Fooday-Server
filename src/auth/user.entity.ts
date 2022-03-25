import { Task } from '../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/products/product.entity';
import PublicFile from 'src/file/publicFile.entity';
import { Reception } from 'src/receptions/reception.entity';
import { ProductCategory } from 'src/product-category/product_category.entity';
import { Meal } from 'src/meal/meal.entity';
import { Ingredient } from 'src/ingredient/ingredient.entity';
import { Recipes } from 'src/recipes/recipes.entity';
import { Customer } from 'src/customers/customers.entity';

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

  @OneToMany((_type) => Customer, (customer) => customer.user, { eager: true })
  customers: Customer[];

  @OneToMany((_type) => Meal, (meal) => meal.user, { eager: true })
  meals: Meal[];

  @OneToMany((_type) => Recipes, (recipes) => recipes.user, { eager: true })
  recipes: Recipes[];

  // @OneToMany((_type) => Ingredient, (ingredient) => ingredient.user, {
  //   eager: true,
  // })
  // ingredients: Ingredient[];
  // @OneToMany((_type) => Product, (product) => product.user, { eager: true })
  // products: Product[];

  @OneToMany((_type) => PublicFile, (file) => file.user, { eager: true })
  files: PublicFile[];

  @OneToMany((_type) => ProductCategory, (category) => category.user, {
    eager: true,
  })
  categories: ProductCategory[];

  @OneToMany((_type) => Reception, (reception) => reception.user, {
    eager: true,
  })
  receptions: Reception[];
}
