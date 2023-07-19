import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "../order/order.model";

@Table({
    tableName: "clients",
    timestamps: false,
})
export default class ClientModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare email: string;

    @Column({ allowNull: false })
    declare address: string;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: true, field: "order_id" })
    declare order_id: string;
}    