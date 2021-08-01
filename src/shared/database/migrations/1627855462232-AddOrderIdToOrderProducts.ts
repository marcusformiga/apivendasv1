import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm"

export class AddOrderIdToOrderProducts1627855462232
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "ordersproducts",
      new TableColumn({
        name: "order_id",
        type: "uuid",
        isNullable: true,
      }),
    )
    await queryRunner.createForeignKey(
      "ordersproducts",
      new TableForeignKey({
        name: "OrdersProductsOrder",
        columnNames: ["order_id"],
        referencedTableName: "orders",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("orders_products", "OrdersProductsOrder")
    await queryRunner.dropColumn("orders_products", "order_id")
  }
}
