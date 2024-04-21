import { Migration } from '@mikro-orm/migrations';

export class Migration20240421030814 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "transactions" alter column "index" type int using ("index"::int);');
    this.addSql('alter table "transactions" alter column "index" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "transactions" alter column "index" type int using ("index"::int);');
    this.addSql('alter table "transactions" alter column "index" set not null;');
  }

}
