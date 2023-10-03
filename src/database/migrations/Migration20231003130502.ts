import { Migration } from '@mikro-orm/migrations';

export class Migration20231003130502 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "accounts" add column "is_locked" boolean not null default false, add column "locked_at" timestamptz(0) null default null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "accounts" drop column "is_locked";');
    this.addSql('alter table "accounts" drop column "locked_at";');
  }
}
