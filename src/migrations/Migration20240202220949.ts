import { Migration } from '@mikro-orm/migrations';

export class Migration20240202220949 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop index "article_title_index";');
  }

  async down(): Promise<void> {
    this.addSql('create index "article_title_index" on "article" ("title");');
  }

}
