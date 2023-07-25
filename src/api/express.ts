import express, {Express} from "express";
import { Sequelize } from "sequelize-typescript";
import { productRoute } from "./routers/product.route";
import ProductAdmProductModel from "../modules/product-adm/repository/product.model";
import { clientRoute } from "./routers/client.route";
import { checkoutRoute } from "./routers/checkout.route";
import ClientAdmClientModel from "../modules/client-adm/repository/client.model";
import InvoiceModel from "../modules/invoice/repository/invoice/invoice.model";
import CheckoutClientModel from "../modules/checkout/repository/client/client.model";
import CheckoutProductModel from "../modules/checkout/repository/product/product.model";
import OrderModel from "../modules/checkout/repository/order/order.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import StoreCatalogProductModel from "../modules/store-catalog/repository/product.model";
import InvoiceProductModel from "../modules/invoice/repository/product/product.model";

export const app : Express = express();
app.use(express.json());
// app.use("/customer", customerRoute);
app.use("/products", productRoute);
app.use("/clients", clientRoute)
app.use("/checkout", checkoutRoute)

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
                  
    });

    await sequelize.addModels([
        ProductAdmProductModel, 
        ClientAdmClientModel,
        InvoiceModel,
        CheckoutClientModel,
        CheckoutProductModel,
        OrderModel,
        InvoiceProductModel,
        TransactionModel,
        StoreCatalogProductModel,        
    ]);
    await sequelize.sync();
}

setupDb();