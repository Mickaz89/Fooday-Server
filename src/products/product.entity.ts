import { Exclude, Transform } from 'class-transformer';
import { User } from '../auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as moment from 'moment';
import { ProductReception } from 'src/product-reception/product_reception.entity';
import { ProductCategory } from 'src/product-category/product_category.entity';
import { ProductInventory } from 'src/product-inventory/product_inventory.entity';
import { ProductHealth } from 'src/product-health/product_health.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  pictureUrl: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  // @Column()
  // reception_status: string;
  // @Column()
  // category: string;

  // @Column()
  // quantity: number;

  // @Column({ type: 'timestamp', nullable: true })
  // // @Transform(({ obj }) => {
  // //   const start = moment(Date.now());
  // //   const end = moment(obj.expiration_date);
  // //   return start.to(end);
  // // })
  // expiration_date: Date;

  // @Column({ type: 'timestamp', nullable: true })
  // last_open: Date;

  // @ManyToOne((_type) => User, (user) => user.products, { eager: false })
  // @Exclude({ toPlainOnly: true })
  // user: User;

  // @OneToOne((type) => Category)
  // @JoinColumn()
  // category: string;
  // @ManyToOne((type) => Category, (category) => category.products)
  // // @Transform(({ obj }) => obj.category.name)
  // category: Category;

  // @ManyToOne((type) => ProductReception, () => reception.products)
  // product_reception: ProductReception;

  // @OneToOne(() => ProductCategory)
  // @JoinColumn()
  // product_category: ProductCategory;

  @ManyToOne(
    (type) => ProductCategory,
    (product_category) => product_category.product,
  )
  // @Transform(({ obj }) => obj.category.name)
  product_category: ProductCategory;

  @OneToOne(() => ProductInventory, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  product_inventory: ProductInventory;

  @OneToOne(() => ProductHealth, { onDelete: 'CASCADE' })
  @JoinColumn()
  product_health: ProductHealth;

  @OneToOne(() => ProductReception, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  product_reception: ProductReception;
}
