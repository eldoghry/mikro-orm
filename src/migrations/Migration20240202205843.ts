import { Migration } from '@mikro-orm/migrations';

export class Migration20240202205843 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "article" drop constraint "article_author_id_foreign";');

    this.addSql('alter table "article" alter column "author_id" type int using ("author_id"::int);');
    this.addSql('alter table "article" alter column "author_id" drop not null;');
    this.addSql('alter table "article" add constraint "article_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "article" drop constraint "article_author_id_foreign";');

    this.addSql('alter table "article" alter column "author_id" type int4 using ("author_id"::int4);');
    this.addSql('alter table "article" alter column "author_id" set not null;');
    this.addSql('alter table "article" add constraint "article_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade on delete no action;');
  }

}
