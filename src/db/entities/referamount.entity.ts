import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refer_amount')
export class ReferAmountEntity {
  constructor(title, amount, isActive) {
    this.title = title;
    this.amount = amount;
    this.isActive = isActive;
    this.createdDate = new Date();
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: false })
  title: string;

  @Column()
  amount: number;

  @Column({ default: false, nullable: false, name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'created_date' })
  createdDate: Date;
}
