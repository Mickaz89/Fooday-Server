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
export class IngredientDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  unit: string;

  @OneToOne(() => Ingredient, { onDelete: 'CASCADE' })
  @JoinColumn()
  ingredient: Ingredient;
}
