import { Migration } from '@mikro-orm/migrations';

export class Migration20240421032044 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "transactions" alter column "gas_price" type bigint using ("gas_price"::bigint);');
    this.addSql('alter table "transactions" alter column "gas_price" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "transactions" alter column "gas_price" type bigint using ("gas_price"::bigint);');
    this.addSql('alter table "transactions" alter column "gas_price" set not null;');
  }

}
