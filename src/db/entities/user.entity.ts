import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReferCodeEntity } from './refercode.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  firstname: string;

  @Column({ length: 10 })
  lastname: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 10, unique: true })
  mobile: string;

  @Column()
  otp: number;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  createdDate: Date;

  @OneToOne(() => ReferCodeEntity, {
    nullable: false,
  })
  @JoinColumn({
    name: 'refer_code',
  })
  referralCode: ReferCodeEntity;
}
