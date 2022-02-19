import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
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
class CreateFileDto {
  @IsNotEmpty()
  public name: string;
}

export default CreateFileDto;
