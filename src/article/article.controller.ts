import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleTypeDto } from './dto/articletype.dto';
import { ArticleDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/create')
  @HttpCode(200)
  async handleArticle(@Body() articleDto: ArticleDto) {
    return await this.articleService.saveArticle(articleDto);
  }

  @Post('type/create')
  @HttpCode(200)
  async handleArticleType(@Body() articleTypeDto: ArticleTypeDto) {
    return await this.articleService.saveArticleType(articleTypeDto);
  }
}
