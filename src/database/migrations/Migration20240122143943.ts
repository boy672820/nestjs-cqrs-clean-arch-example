import { Migration } from '@mikro-orm/migrations';

export class Migration20240122143943 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "histories" ("history_id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default \'now\', "amount" numeric(38,0) not null, "fromAccountId" text not null, "toAccountId" text not null, constraint "histories_pkey" primary key ("history_id"));');

    this.addSql('alter table "histories" add constraint "histories_fromAccountId_foreign" foreign key ("fromAccountId") references "accounts" ("account_id", "user_id") on update cascade;');
    this.addSql('alter table "histories" add constraint "histories_toAccountId_foreign" foreign key ("toAccountId") references "accounts" ("account_id", "user_id") on update cascade;');

    this.addSql('drop table if exists "transactions" cascade;');

    this.addSql('alter table "users" add column "otp_secret" varchar(16) null;');
  }

  async down(): Promise<void> {
    this.addSql('create table "transactions" ("transaction_id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default \'now\', "amount" numeric(38,0) not null, "fromAccountId" text not null, "toAccountId" text not null, constraint "transactions_pkey" primary key ("transaction_id"));');

    this.addSql('alter table "transactions" add constraint "transactions_fromAccountId_foreign" foreign key ("fromAccountId") references "accounts" ("account_id", "user_id") on update cascade;');
    this.addSql('alter table "transactions" add constraint "transactions_toAccountId_foreign" foreign key ("toAccountId") references "accounts" ("account_id", "user_id") on update cascade;');

    this.addSql('drop table if exists "histories" cascade;');

    this.addSql('alter table "users" drop column "otp_secret";');
  }

}
