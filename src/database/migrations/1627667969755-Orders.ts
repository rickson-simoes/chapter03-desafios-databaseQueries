import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class Orders1627666881600 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "order_name",
            type: "varchar",
          }
        ]
      }));

      await queryRunner.addColumn("orders", new TableColumn({
        name: "fk_user_id",
        type: "uuid"
      }))

      await queryRunner.createForeignKey("orders", new TableForeignKey({
        columnNames: ["fk_user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE"
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("orders", "fk_user_id");
      await queryRunner.dropColumn("orders", "fk_user_id");
      await queryRunner.dropTable("orders");
    }

}
