import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { ProductsModule } from './products/products.module';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { SendgridService } from './sendgrid/sendgrid.service';
import { MailController } from './mail/mail.controller';
import { ReceptionsModule } from './receptions/receptions.module';
import { ProductReceptionController } from './product-reception/product-reception.controller';
import { ProductReceptionModule } from './product-reception/product-reception.module';
import { ProductInventoryController } from './product-inventory/product-inventory.controller';
import { ProductInventoryModule } from './product-inventory/product-inventory.module';
import { ProductHealthController } from './product-health/product-health.controller';
import { ProductHealthModule } from './product-health/product-health.module';
import { ProductCategoryController } from './product-category/product-category.controller';
import { ProductCategoryModule } from './product-category/product-category.module';
import { MealModule } from './meal/meal.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { IngredientCategoryModule } from './ingredient-category/ingredient-category.module';
import { IngredientDetailsService } from './ingredient-details/ingredient-details.service';
import { IngredientDetailsModule } from './ingredient-details/ingredient-details.module';
import { RecipesModule } from './recipes/recipes.module';
import { RecipeIngredientsController } from './recipe-ingredients/recipe-ingredients.controller';
import { RecipeIngredientsService } from './recipe-ingredients/recipe-ingredients.service';
import { RecipeIngredientsModule } from './recipe-ingredients/recipe-ingredients.module';
import { MeasurementsUnitsController } from './measurements-units/measurements-units.controller';
import { MeasurementsUnitsService } from './measurements-units/measurements-units.service';
import { MeasurementsUnitsModule } from './measurements-units/measurements-units.module';
import { MeasurementsQtyController } from './measurements-qty/measurements-qty.controller';
import { MeasurementsQtyService } from './measurements-qty/measurements-qty.service';
import { MeasurementsQtyModule } from './measurements-qty/measurements-qty.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    AuthModule,
    ProductsModule,
    ProductReceptionModule,
    ProductCategoryModule,
    ProductInventoryModule,
    ProductHealthModule,
    // CategoriesModule,
    FileModule,
    ReceptionsModule,
    MealModule,
    IngredientModule,
    IngredientCategoryModule,
    IngredientDetailsModule,
    RecipesModule,
    RecipeIngredientsModule,
    MeasurementsUnitsModule,
    MeasurementsQtyModule,
  ],
})
export class AppModule {}
