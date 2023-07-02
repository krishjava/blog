import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleTypeEntity } from './articletype.entity';

@Entity('articles')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10, nullable: false, name: 'article_id' })
  articleId: string;

  @OneToOne((at) => ArticleTypeEntity, { nullable: false })
  @JoinColumn({
    name: 'article_type',
  })
  articleType: ArticleTypeEntity;

  @Column({ default: false, name: 'is_active' })
  isActive: boolean;

  @Column({ nullable: false, name: 'created_date' })
  createdDate: Date;
}
