import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class Genres1627664654574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "genres",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "genre_name",
            type: "varchar"
          }
        ]
      }));

      await queryRunner.addColumn("genres", new TableColumn({
        name: "fk_games_id",
        type: "uuid"
      }));

      await queryRunner.createForeignKey("genres", new TableForeignKey({
        columnNames: ["fk_games_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "games",
        onDelete: "CASCADE"
      }));      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("genres", "fk_games_id");
      await queryRunner.dropColumn("genres", "fk_games_id");
      await queryRunner.dropTable("genres");
    }

}
