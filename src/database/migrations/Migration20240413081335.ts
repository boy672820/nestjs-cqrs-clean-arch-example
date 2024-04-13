import { Migration } from '@mikro-orm/migrations';

export class Migration20240413081335 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "transactions" ("hash" varchar(66) not null, "created_at" timestamptz(0) not null default now, "updated_at" timestamptz(0) not null default now, "nonce" int not null, "from" varchar(42) not null, "to" varchar(42) null, "block_number" int null, "block_hash" varchar(66) null, "index" int not null, "gas_price" bigint not null, "gas_limit" int not null, "gas_used" int null, "fee" numeric(38,0) null, "status" smallint not null, constraint "transactions_pkey" primary key ("hash"));');

    this.addSql('alter table "histories" drop constraint "histories_from_account_id_foreign";');

    this.addSql('alter table "histories" add column "recipient_user_id" text not null, add column "recipient_account_id" text not null, add column "account_id" text not null, add column "user_id" text not null;');
    this.addSql('alter table "histories" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "histories" alter column "created_at" set default \'now\';');
    this.addSql('alter table "histories" drop constraint "histories_pkey";');
    this.addSql('alter table "histories" drop column "from_account_id";');
    this.addSql('alter table "histories" drop column "to_account_id";');
    this.addSql('alter table "histories" drop column "from_account_address";');
    this.addSql('alter table "histories" drop column "to_account_address";');
    this.addSql('alter table "histories" add constraint "histories_account_id_user_id_foreign" foreign key ("account_id", "user_id") references "accounts" ("account_id", "user_id") on update cascade;');
    this.addSql('alter table "histories" add constraint "histories_pkey" primary key ("history_id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "transactions" cascade;');

    this.addSql('alter table "histories" drop constraint "histories_account_id_user_id_foreign";');

    this.addSql('alter table "histories" add column "from_account_id" text not null, add column "to_account_id" text not null, add column "from_account_address" varchar(42) not null, add column "to_account_address" varchar(42) not null;');
    this.addSql('alter table "histories" alter column "created_at" drop default;');
    this.addSql('alter table "histories" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "histories" drop constraint "histories_pkey";');
    this.addSql('alter table "histories" add constraint "histories_from_account_id_foreign" foreign key ("from_account_id") references "accounts" ("account_id") on update cascade;');
    this.addSql('alter table "histories" drop column "recipient_user_id";');
    this.addSql('alter table "histories" drop column "recipient_account_id";');
    this.addSql('alter table "histories" drop column "account_id";');
    this.addSql('alter table "histories" drop column "user_id";');
    this.addSql('alter table "histories" add constraint "histories_pkey" primary key ("from_account_id");');
  }

}
