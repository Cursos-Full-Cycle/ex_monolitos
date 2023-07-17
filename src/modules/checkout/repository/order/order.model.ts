import { Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModel from "../product/product.model";
import ClientModel from "../client/client.model";

@Table({
  tableName: "oders",
  timestamps: false,
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare status: string;

    @HasOne(() => ClientModel, 'order_id')
    declare client: ClientModel;

    @HasMany(() => ProductModel,'order_id')
    declare products: ProductModel[];

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;
}