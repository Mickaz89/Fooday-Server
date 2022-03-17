import { EntityRepository, Repository } from 'typeorm';
import { IngredientCategory } from './ingredient-category.entity';

@EntityRepository(IngredientCategory)
export class IngredientCategoryRepository extends Repository<IngredientCategory> {}
