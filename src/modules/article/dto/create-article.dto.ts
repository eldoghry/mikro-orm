import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  text: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  authorId?: number;
}
