import express, {Express} from "express";
import { Sequelize } from "sequelize-typescript";
import { productRoute } from "./routers/product.route";
import ProductAdmProductModel from "../modules/product-adm/repository/product.model";

export const app : Express = express();
app.use(express.json());
// app.use("/customer", customerRoute);
app.use("/products", productRoute);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
                  
    });

    await sequelize.addModels([ProductAdmProductModel]);
    await sequelize.sync();
}

setupDb();