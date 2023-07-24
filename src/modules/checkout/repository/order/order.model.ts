import { Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import CheckoutClientModel from "../client/client.model";
import CheckoutProductModel from "../product/product.model";

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

    @HasOne(() => CheckoutClientModel, 'order_id')
    declare client: CheckoutClientModel;

    @HasMany(() => CheckoutProductModel,'order_id')
    declare products: CheckoutProductModel[];

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;
}