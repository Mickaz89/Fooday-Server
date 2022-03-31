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
import { Ingredient } from 'src/ingredient/ingredient.entity';

@Entity()
export class IngredientCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.category)
  ingredient: Ingredient;

  @ManyToOne(() => User, (user) => user.ingredientCategories, { eager: false })
  user: User;
}
