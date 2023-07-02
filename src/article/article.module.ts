import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleEntity } from 'src/db/entities/article.entity';
import { ArticleTypeEntity } from 'src/db/entities/articletype.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, ArticleTypeEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
