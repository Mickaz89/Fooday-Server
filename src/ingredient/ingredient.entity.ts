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

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  name: string;

  @Column()
  unit: string;

  @ManyToOne(() => Meal, (meal) => meal.ingredients, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  meal: Meal;

  @ManyToOne((_type) => User, (user) => user.ingredients, { eager: false })
  user: User;

  // @OneToOne(() => Product, { onDelete: 'CASCADE' })
  // @JoinColumn()
  // product: Product;
}
