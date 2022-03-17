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
import { MeasurementUnits } from 'src/measurements-units/measurement-units.entity';
import { MeasurementQty } from 'src/measurements-qty/measurement-qty.entity';
import { Ingredient } from 'src/ingredient/ingredient.entity';
import { Recipes } from 'src/recipes/recipes.entity';

@Entity()
export class RecipeIngredients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => MeasurementUnits,
    (measurementUnits) => measurementUnits.recipeIngredients,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  measurementUnit: MeasurementUnits;

  // @OneToOne(() => MeasurementUnits, { onDelete: 'CASCADE' })
  // @JoinColumn()
  // measurementUnits: MeasurementUnits;

  // @OneToOne(() => MeasurementQty, { onDelete: 'CASCADE' })
  // measurementQty: MeasurementQty;

  @Column({ type: 'float' })
  quantity: number;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  ingredient: Ingredient;

  @ManyToOne((_type) => Recipes, (recipe) => recipe.ingredients, {
    eager: false,
    onDelete: 'CASCADE',
  })
  recipe: Recipes;
}
