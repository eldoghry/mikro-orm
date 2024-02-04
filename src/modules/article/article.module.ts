import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Article } from './entities/article.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
