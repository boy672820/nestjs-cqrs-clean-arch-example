import { Migration } from '@mikro-orm/migrations';

export class Migration20230928075647 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("user_id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default now, "updated_at" timestamptz(0) not null default now, "username" text not null, "password" text not null, constraint "users_pkey" primary key ("user_id"));',
    );
    this.addSql(
      'alter table "users" add constraint "users_username_unique" unique ("username");',
    );

    this.addSql(
      'create table "wallets" ("user_id" text not null, "created_at" timestamptz(0) not null default \'now\', "address" varchar(42) not null, "public_key" text not null, constraint "wallets_pkey" primary key ("user_id"));',
    );

    this.addSql(
      'create table "accounts" ("account_id" text not null, "created_at" timestamptz(0) not null default now, "updated_at" timestamptz(0) not null default now, "index" int not null, "account_address" varchar(42) not null, "balance" numeric(38,0) not null default \'0\', "user_id" text not null, constraint "accounts_pkey" primary key ("account_id"));',
    );
    this.addSql(
      'alter table "accounts" add constraint "accounts_account_address_unique" unique ("account_address");',
    );

    this.addSql(
      'create table "transactions" ("transaction_id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default \'now\', "amount" numeric(38,0) not null, "fromAccountId" text not null, "toAccountId" text not null, constraint "transactions_pkey" primary key ("transaction_id"));',
    );

    this.addSql(
      'alter table "accounts" add constraint "accounts_user_id_foreign" foreign key ("user_id") references "wallets" ("user_id") on update cascade;',
    );

    this.addSql(
      'alter table "transactions" add constraint "transactions_fromAccountId_foreign" foreign key ("fromAccountId") references "accounts" ("account_id") on update cascade;',
    );
    this.addSql(
      'alter table "transactions" add constraint "transactions_toAccountId_foreign" foreign key ("toAccountId") references "accounts" ("account_id") on update cascade;',
    );
  }
}
