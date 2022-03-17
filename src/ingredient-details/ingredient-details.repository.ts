import { EntityRepository, Repository } from 'typeorm';
import { IngredientDetails } from './ingredient-details.entity';

@EntityRepository(IngredientDetails)
export class IngredientDetailsRepository extends Repository<IngredientDetails> {}
