import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReferCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 6, unique: true })
  code: string;

  @Column({ default: false })
  used: boolean;
}
