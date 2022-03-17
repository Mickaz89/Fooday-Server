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
export class MeasurementQty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: string;

  @OneToOne(() => RecipeIngredients, { onDelete: 'CASCADE' })
  ingredient: RecipeIngredients;
}
