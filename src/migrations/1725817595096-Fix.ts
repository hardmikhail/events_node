import { MigrationInterface, QueryRunner } from "typeorm";

export class Fix1725817595096 implements MigrationInterface {
    name = 'Fix1725817595096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "location" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "fullname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "fullname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "location" DROP NOT NULL`);
    }

}
