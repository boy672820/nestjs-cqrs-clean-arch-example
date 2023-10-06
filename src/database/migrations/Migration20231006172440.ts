import { Migration } from '@mikro-orm/migrations';

export class Migration20231006172440 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "transactions" drop constraint "transactions_fromAccountId_foreign";');
    this.addSql('alter table "transactions" drop constraint "transactions_toAccountId_foreign";');

    this.addSql('alter table "accounts" drop constraint "accounts_pkey";');
    this.addSql('alter table "accounts" add constraint "accounts_account_id_unique" unique ("account_id");');
    this.addSql('alter table "accounts" add constraint "accounts_pkey" primary key ("account_id", "user_id");');

    this.addSql('alter table "transactions" add constraint "transactions_fromAccountId_foreign" foreign key ("fromAccountId") references "accounts" ("account_id", "user_id") on update cascade;');
    this.addSql('alter table "transactions" add constraint "transactions_toAccountId_foreign" foreign key ("toAccountId") references "accounts" ("account_id", "user_id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "transactions" drop constraint "transactions_fromAccountId_foreign";');
    this.addSql('alter table "transactions" drop constraint "transactions_toAccountId_foreign";');

    this.addSql('alter table "accounts" drop constraint "accounts_account_id_unique";');
    this.addSql('alter table "accounts" drop constraint "accounts_pkey";');
    this.addSql('alter table "accounts" add constraint "accounts_pkey" primary key ("account_id");');

    this.addSql('alter table "transactions" add constraint "transactions_fromAccountId_foreign" foreign key ("fromAccountId") references "accounts" ("account_id") on update cascade;');
    this.addSql('alter table "transactions" add constraint "transactions_toAccountId_foreign" foreign key ("toAccountId") references "accounts" ("account_id") on update cascade;');
  }

}
