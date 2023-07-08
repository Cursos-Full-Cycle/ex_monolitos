import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "../invoice/invoice.model";

@Table({
    tableName: "products",
    timestamps: false,
})
export default class ProductModel extends Model {
   @PrimaryKey
   @Column({allowNull: false})
   declare id: string;

   @Column({allowNull: false})
   declare name: string;

   @Column({allowNull: false})
   declare price: number;

   @ForeignKey(() => InvoiceModel)
   @Column({ allowNull: false, field: "invoice_id" })
   declare invoice_id: string;

}