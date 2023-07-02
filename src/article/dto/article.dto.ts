import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ArticleDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  articleId: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
  articleType: string;
}
