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
import { Reception } from 'src/receptions/reception.entity';

@Entity()
export class ProductReception {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @Column()
  quantity: number;

  @Column({ type: 'timestamp', nullable: true })
  expiration_date: Date;

  @Column({ nullable: true })
  missing_quantity: number;

  @OneToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product;

  // @OneToOne(() => Reception)
  // reception: Reception;

  @ManyToOne((_type) => Reception, (reception) => reception.products)
  @JoinColumn()
  reception: Reception;

  // ProductReception can be associated with more than one product
  // @OneToMany((_type) => Product, (product) => product.product_reception)
  // products: Product[];

  // @OneToOne(() => Reception)
  // reception: Reception;
}
