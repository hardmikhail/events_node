import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1724516852980 implements MigrationInterface {
  name = 'Init1724516852980';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_location_enum" AS ENUM('Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Пермь', 'Воронеж', 'Волгоград', 'Калининград', 'Тула', 'Курск', 'Тюмень', 'Саратов', 'Пенза', 'Кемерово', 'Владимир', 'Ярославль', 'Иваново', 'Владивосток', 'Иркутск', 'Чита', 'Хабаровск', 'Улан-Удэ', 'Томск', 'Мурманск', 'Архангельск', 'Смоленск', 'Тверь', 'Липецк', 'Брянск', 'Кострома', 'Псков', 'Оренбург', 'Ульяновск', 'Киров', 'Барнаул', 'Рязань', 'Махачкала', 'Владикавказ', 'Черкесск', 'Калуга', 'Каменск-Уральский')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'organizer')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "location" "public"."user_location_enum", "fullname" character varying, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "booking" ("id" SERIAL NOT NULL, "userId" integer, "eventId" integer, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."event_location_enum" AS ENUM('Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Пермь', 'Воронеж', 'Волгоград', 'Калининград', 'Тула', 'Курск', 'Тюмень', 'Саратов', 'Пенза', 'Кемерово', 'Владимир', 'Ярославль', 'Иваново', 'Владивосток', 'Иркутск', 'Чита', 'Хабаровск', 'Улан-Удэ', 'Томск', 'Мурманск', 'Архангельск', 'Смоленск', 'Тверь', 'Липецк', 'Брянск', 'Кострома', 'Псков', 'Оренбург', 'Ульяновск', 'Киров', 'Барнаул', 'Рязань', 'Махачкала', 'Владикавказ', 'Черкесск', 'Калуга', 'Каменск-Уральский')`,
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "description" text NOT NULL, "location" "public"."event_location_enum" NOT NULL, "price" integer NOT NULL, "tag" character varying NOT NULL, "organizerId" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_161ef84a823b75f741862a77138" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_19642e6a244b4885e14eab0fdc0" FOREIGN KEY ("organizerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_19642e6a244b4885e14eab0fdc0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_161ef84a823b75f741862a77138"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`,
    );
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TYPE "public"."event_location_enum"`);
    await queryRunner.query(`DROP TABLE "booking"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_location_enum"`);
  }
}
