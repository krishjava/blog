import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/db/entities/article.entity';
import { ArticleTypeEntity } from 'src/db/entities/articletype.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleEntity: Repository<ArticleEntity>,
    @InjectRepository(ArticleTypeEntity)
    private readonly articleTypeEntity: Repository<ArticleTypeEntity>,
  ) {}

  async saveArticleType(articleTypeDto) {
    return await this.findArticleType(articleTypeDto.title)
      .then((res) => {
        if (res) {
          throw new HttpException('type already exist', HttpStatus.CONFLICT);
        }
      })
      .then(async () => {
        const articleType = new ArticleTypeEntity();
        articleType.title = articleTypeDto.title.trim();
        articleType.createdDate = new Date();
        return await this.articleTypeEntity.save(articleType);
      });
  }

  async findArticleType(title) {
    return await this.articleTypeEntity.findOne({
      where: { title: title.trim() },
    });
  }

  async saveArticle(articleDto) {
    const _article = await this.findArticle(articleDto.articleId);
    const _type = await this.findArticleType(articleDto.articleType);

    if (_article || !_type) {
      throw new HttpException(
        "article  can't be save!",
        HttpStatus.BAD_REQUEST,
      );
    }
    const article = new ArticleEntity();
    article.articleId = articleDto.articleId.trim();
    article.articleType = _type;
    article.isActive = false;
    article.createdDate = new Date();

    const savedArticle = await this.articleEntity.save(article);
    if (savedArticle) {
      return { message: 'article has been saved successfully!' };
    }
  }

  async findArticle(articleId) {
    return await this.articleEntity.findOne({
      where: { articleId: articleId.trim() },
    });
  }
}
