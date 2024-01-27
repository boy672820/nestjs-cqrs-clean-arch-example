import { Migration } from '@mikro-orm/migrations';

export class Migration20240124150132 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "histories" alter column "history_id" type text using ("history_id"::text);');

    this.addSql('alter table "histories" drop constraint "histories_fromAccountId_foreign";');
    this.addSql('alter table "histories" drop constraint "histories_toAccountId_foreign";');

    this.addSql('alter table "histories" add column "from_account_id" text not null, add column "to_account_id" text not null, add column "from_account_address" varchar(42) not null, add column "to_account_address" varchar(42) not null, add column "history_type" varchar(255) not null;');
    this.addSql('alter table "histories" alter column "history_id" drop default;');
    this.addSql('alter table "histories" alter column "history_id" type text using ("history_id"::text);');
    this.addSql('alter table "histories" alter column "created_at" drop default;');
    this.addSql('alter table "histories" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "histories" drop constraint "histories_pkey";');
    this.addSql('alter table "histories" add constraint "histories_from_account_id_foreign" foreign key ("from_account_id") references "accounts" ("account_id") on update cascade;');
    this.addSql('alter table "histories" drop column "fromAccountId";');
    this.addSql('alter table "histories" drop column "toAccountId";');
    this.addSql('alter table "histories" add constraint "histories_pkey" primary key ("from_account_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "histories" drop constraint "histories_from_account_id_foreign";');

    this.addSql('alter table "histories" add column "fromAccountId" text not null, add column "toAccountId" text not null;');
    this.addSql('alter table "histories" alter column "history_id" drop default;');
    this.addSql('alter table "histories" alter column "history_id" type uuid using ("history_id"::text::uuid);');
    this.addSql('alter table "histories" alter column "history_id" set default uuid_generate_v4();');
    this.addSql('alter table "histories" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "histories" alter column "created_at" set default \'now\';');
    this.addSql('alter table "histories" drop constraint "histories_pkey";');
    this.addSql('alter table "histories" add constraint "histories_fromAccountId_foreign" foreign key ("fromAccountId") references "accounts" ("account_id") on update cascade;');
    this.addSql('alter table "histories" add constraint "histories_toAccountId_foreign" foreign key ("toAccountId") references "accounts" ("account_id") on update cascade;');
    this.addSql('alter table "histories" drop column "from_account_id";');
    this.addSql('alter table "histories" drop column "to_account_id";');
    this.addSql('alter table "histories" drop column "from_account_address";');
    this.addSql('alter table "histories" drop column "to_account_address";');
    this.addSql('alter table "histories" drop column "history_type";');
    this.addSql('alter table "histories" add constraint "histories_pkey" primary key ("history_id");');
  }

}
