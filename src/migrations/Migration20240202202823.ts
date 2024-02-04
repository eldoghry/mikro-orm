import { Migration } from '@mikro-orm/migrations';

export class Migration20240202202823 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "article" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "slug" varchar(255) not null, "title" varchar(255) not null, "description" varchar(1000) not null, "text" text not null, "author_id" int not null);');
    this.addSql('alter table "article" add constraint "article_slug_unique" unique ("slug");');
    this.addSql('create index "article_title_index" on "article" ("title");');

    this.addSql('alter table "article" add constraint "article_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "article" cascade;');
  }

}
