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
export class Recipes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  picture: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  servingSize: number;

  @Column({ nullable: true })
  cookingTime: number;

  @OneToMany(
    (_type) => RecipeIngredients,
    (ingredients) => ingredients.recipe,
    { eager: true, onDelete: 'CASCADE' },
  )
  ingredients: RecipeIngredients[];

  @ManyToOne(() => User, (user) => user.recipes, { eager: false })
  user: User;
}
