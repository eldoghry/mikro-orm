import { Migration } from '@mikro-orm/migrations';

export class Migration20240204073650 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "article" add column "author_id" int null;');
    this.addSql('alter table "article" add constraint "article_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "article" drop constraint "article_author_id_foreign";');

    this.addSql('alter table "article" drop column "author_id";');
  }

}
