import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Meal } from 'src/meal/meal.entity';
import { User } from 'src/auth/user.entity';
import { IngredientCategory } from 'src/ingredient-category/ingredient-category.entity';
import { IngredientDetails } from 'src/ingredient-details/ingredient-details.entity';
import { RecipeIngredients } from 'src/recipe-ingredients/recipe-ingredients.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  // @ManyToOne(() => Meal, (meal) => meal.ingredients, {
  //   eager: false,
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn()
  // meal: Meal;

  @ManyToOne((_type) => User, (user) => user.ingredients, { eager: false })
  user: User;

  @Exclude()
  @OneToMany(
    (_type) => RecipeIngredients,
    (recipeIngredients) => recipeIngredients.ingredient,
    { eager: true },
  )
  recipeIngredients: RecipeIngredients[];

  @ManyToOne((_type) => IngredientCategory, (category) => category.ingredient, {
    nullable: false,
  })
  category: IngredientCategory;

  // @OneToOne(() => IngredientDetails, { onDelete: 'CASCADE' })
  // @JoinColumn()
  // details: IngredientDetails;
}
