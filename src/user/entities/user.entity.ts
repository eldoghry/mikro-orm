import { BeforeCreate, BeforeUpdate, Entity, EventArgs, PrimaryKey, Property } from '@mikro-orm/core';
import * as crypto from 'crypto';
import { BaseEntity } from '../../abstract/base.entity';

@Entity()
export class User extends BaseEntity {
  @Property()
  fullName!: string;

  @Property()
  email!: string;

  @Property({ hidden: true, lazy: true })
  password!: string;

  @Property({ type: 'text', lazy: true })
  bio = '';

  @BeforeCreate()
  @BeforeUpdate()
  hashPassword(args: EventArgs<User>) {
    const password = args.changeSet.payload.password;
    if (password) this.password = crypto.createHash('sha512').update(password).digest('hex');
  }
}
