import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article_types')
export class ArticleTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25, unique: true, nullable: false })
  title: string;

  @Column({ nullable: false, name: 'created_date' })
  createdDate: Date;
}
