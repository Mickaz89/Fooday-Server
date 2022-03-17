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
import { Product } from 'src/products/product.entity';
import { Ingredient } from 'src/ingredient/ingredient.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  description: Date;

  // @OneToMany(() => Ingredient, (ingredient) => ingredient.meal, {
  //   eager: true,
  //   onDelete: 'CASCADE',
  //   cascade: true,
  // })
  // ingredients: Ingredient[];

  @ManyToOne((_type) => User, (user) => user.meals, { eager: false })
  user: User;
}
