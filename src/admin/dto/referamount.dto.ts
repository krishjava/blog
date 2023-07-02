import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class ReferAmountDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 30)
  title: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
