import { Migration } from '@mikro-orm/migrations';

export class Migration20240414034156 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "transactions" alter column "to" type varchar(42) using ("to"::varchar(42));');
    this.addSql('alter table "transactions" alter column "to" set not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "transactions" alter column "to" type varchar(42) using ("to"::varchar(42));');
    this.addSql('alter table "transactions" alter column "to" drop not null;');
  }

}
