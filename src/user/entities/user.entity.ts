import { BeforeCreate, BeforeUpdate, Entity, EventArgs, PrimaryKey, Property } from '@mikro-orm/core';
import * as crypto from 'crypto';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  fullName!: string;

  @Property()
  email!: string;

  @Property({ hidden: true, lazy: true })
  password!: string;

  @Property({ type: 'text', lazy: true })
  bio = '';

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @BeforeCreate()
  @BeforeUpdate()
  hashPassword(args: EventArgs<User>) {
    const password = args.changeSet.payload.password;
    if (password) this.password = crypto.createHash('sha512').update(password).digest('hex');
  }
}
