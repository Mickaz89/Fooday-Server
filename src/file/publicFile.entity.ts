import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class PublicFile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public key: string;

  @Column()
  public url: string;

  @Column()
  public type: string;

  @ManyToOne(() => User, (user) => user.files, { eager: false })
  @Exclude({ toPlainOnly: true })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  created_at: Date;
}

export default PublicFile;
