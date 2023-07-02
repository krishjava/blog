import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ArticleTypeDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
  title: string;
}
