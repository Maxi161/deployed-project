import { MigrationInterface, QueryRunner } from 'typeorm';

export class MyMigration1724166956676 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE prueba (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE prueba;');
  }
}
