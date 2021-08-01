import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm"

export class AddProductIdToOrdersProducts1627856121680
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "ordersproducts",
      new TableColumn({
        name: "product_id",
        type: "uuid",
        isNullable: true,
      }),
    )
    await queryRunner.createForeignKey(
      "ordersproducts",
      new TableForeignKey({
        name: "OrdersProductsProduct",
        columnNames: ["product_id"],
        referencedTableName: "products",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("ordersproducts", "OrdersProductsProduct")
    await queryRunner.dropColumn("ordersproducts", "product_id")
  }
}
