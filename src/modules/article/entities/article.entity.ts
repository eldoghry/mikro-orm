import { BeforeCreate, Entity, ManyToOne, Property, t, EventArgs, PrimaryKey } from '@mikro-orm/core';
import { BaseEntity } from '../../../abstract/base.entity';
import { User } from '../../user/entities/user.entity';
import { convertToSlug } from './../../../utilities/create-slug';

@Entity()
export class Article {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ unique: true })
  slug!: string;

  // @Property()
  @Property({ index: true })
  title!: string;

  @Property({ length: 1000 })
  description!: string;

  @Property({ type: t.text, lazy: true })
  text!: string;

  // @ManyToOne({ nullable: true })
  //   @ManyToOne(() => User)
  //   @ManyToOne('User')
  @ManyToOne({ entity: () => User, nullable: true, inversedBy: 'articles' })
  author?: User;

  @BeforeCreate()
  createSlug() {
    this.slug = convertToSlug(this.title);
  }

  createDescription(args: EventArgs<Article>) {
    const description = args.changeSet.payload.description;
    if (!description) this.description = this.text.slice(0, 999) + '...';
  }
}
