import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/postgresql';
import { User } from '../user/entities/user.entity';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly repo: EntityRepository<Article>,
    private readonly em: EntityManager,
  ) {}

  // async create(createArticleDto: CreateArticleDto) {
  //   const _em = this.em.fork();
  //   console.log('🚀 ~ ArticleService ~ create ~ createArticleDto:', _em._id);
  //   const { authorId, ...payload } = createArticleDto;
  //   const article = _em.create(Article, payload);
  //   // const article = new Article();
  //   // wrap(article).assign(payload);

  //   // if (authorId) {
  //   // // work only one time, fail in second time
  //   //   const userRef = _em.getReference(User, authorId);
  //   //   console.log('🚀 ~ ArticleService ~ create ~ userRef:', userRef);
  //   //   article.author = userRef;
  //   // }

  //   if (authorId) {
  //     // work only one time, fail in second time
  //     const user = await _em.findOne(User, { id: authorId });
  //     article.author = user;
  //   }

  //   await _em.persistAndFlush(article);
  //   console.log('🚀 ~ ArticleService ~ create ~ article:', article);
  //   return article;
  // }

  async create(createArticleDto: CreateArticleDto) {
    console.log('🚀 ~ ArticleService ~ create ~ em_id:', this.em._id);
    const { authorId, ...payload } = createArticleDto;
    const article = new Article();
    wrap(article).assign(payload);

    // if (authorId) {
    //   const userRef = this.em.getReference(User, authorId);
    //   article.author = userRef;
    // }

    if (authorId) {
      // work only one time, fail in second time
      const user = await this.em.findOne(User, { id: authorId });
      // article.author = user;
      user.articles.add(article);
    }
    console.log(article);
    await this.em.persistAndFlush(article);

    return article;
  }

  async findAll() {
    const _em = this.em.fork();
    const [articles, total] = await _em.findAndCount(Article, {});
    return { total, data: articles };
  }

  findOne(id: number) {
    return this.findOneOrFail(id);
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  async remove(id: number) {
    const _em = this.em.fork();
    const article = _em.getReference(Article, id); // no need to load entity for db, you can load ony ref from identity map
    await _em.removeAndFlush(article);
    return article;
  }

  async findOneOrFail(id: number) {
    const _em = this.em.fork();
    const article = await _em.findOne(Article, { id });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }
}
