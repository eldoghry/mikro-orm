import { BeforeCreate, BeforeUpdate, Collection, Entity, EventArgs, OneToMany, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import * as crypto from 'crypto';
import { BaseEntity } from '../../../abstract/base.entity';
import { Article } from '../../article/entities/article.entity';

@Entity()
export class User {
  [OptionalProps]?: 'createdAt' | 'updatedAt' | 'password';

  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  fullName!: string;

  @Property()
  email!: string;

  @Property({ hidden: true, lazy: true })
  password: string;

  @Property({ type: 'text', lazy: true })
  bio = '';

  @OneToMany({ entity: () => Article, mappedBy: 'author' })
  articles = new Collection<Article>(this);

  @BeforeCreate()
  @BeforeUpdate()
  hashPassword(args: EventArgs<User>) {
    const password = args.changeSet.payload.password;
    console.log('🚀 ~ User ~ hashPassword ~ const:', password, 'password should update');

    if (password) this.password = crypto.createHash('sha512').update(password).digest('hex');
  }
}
