import { Product } from 'src/products/product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Meal } from './meal.entity';

@EntityRepository(Meal)
export class MealRepository extends Repository<Meal> {}
