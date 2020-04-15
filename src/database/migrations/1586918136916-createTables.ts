import { MigrationInterface, QueryRunner } from 'typeorm';

export default class createTables1586918136916 implements MigrationInterface {
  name = 'createTables1586918136916';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "created_at" TIME WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, "updated_at" TIME WITH TIME ZONE DEFAULT now(), CONSTRAINT "UQ_aa79448dc3e959720ab4c13651d" UNIQUE ("title"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TYPE "transactions_type_enum" AS ENUM('income', 'outcome')`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "type" "transactions_type_enum" NOT NULL DEFAULT 'income', "value" integer NOT NULL, "category_id" uuid NOT NULL, "created_at" TIME WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIME WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_86e965e74f9cc66149cf6c90f64" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_86e965e74f9cc66149cf6c90f64"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "transactions"`, undefined);
    await queryRunner.query(`DROP TYPE "transactions_type_enum"`, undefined);
    await queryRunner.query(`DROP TABLE "categories"`, undefined);
  }
}
