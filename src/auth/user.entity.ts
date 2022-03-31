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
import { Exclude } from 'class-transformer';
import { IngredientCategory } from 'src/ingredient-category/ingredient-category.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  @Exclude()
  tasks: Task[];

  @OneToMany((_type) => Customer, (customer) => customer.user, { eager: true })
  @Exclude()
  customers: Customer[];

  @OneToMany((_type) => Meal, (meal) => meal.user, { eager: true })
  @Exclude()
  meals: Meal[];

  @OneToMany((_type) => Recipes, (recipes) => recipes.user, { eager: true })
  @Exclude()
  recipes: Recipes[];

  @OneToMany((_type) => Ingredient, (ingredient) => ingredient.user, {
    eager: true,
  })
  ingredients: Ingredient[];

  // @OneToMany((_type) => Product, (product) => product.user, { eager: true })
  // products: Product[];

  @OneToMany((_type) => PublicFile, (file) => file.user, { eager: true })
  @Exclude()
  files: PublicFile[];

  @OneToMany((_type) => ProductCategory, (category) => category.user, {
    eager: true,
  })
  @Exclude()
  categories: ProductCategory[];

  @OneToMany(
    (_type) => IngredientCategory,
    (ingredientCategory) => ingredientCategory.user,
    {
      eager: true,
    },
  )
  @Exclude()
  ingredientCategories: IngredientCategory[];

  @OneToMany((_type) => Reception, (reception) => reception.user, {
    eager: true,
  })
  @Exclude()
  receptions: Reception[];
}
