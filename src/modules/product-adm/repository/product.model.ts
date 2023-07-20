import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class ProductAdmProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: true })
  declare name: string;

  @Column({ allowNull: true })
  declare description: string;

  @Column({ allowNull: false })
  declare purchasePrice: number;

  @Column({ allowNull: true })
  declare stock: number;

  @Column({ allowNull: true })
  declare createdAt: Date;

  @Column({ allowNull: true })
  declare updatedAt: Date;
}