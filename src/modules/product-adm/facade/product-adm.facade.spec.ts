import { Sequelize } from "sequelize-typescript";
import ProductAdmProductModel from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe("ProductAdmFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });

        await sequelize.addModels([ProductAdmProductModel]);
        await sequelize.sync();
    });

    // afterEach(async () => {
    //     await sequelize.close();
    // });

    it("should create a product", async () => {
        
        const productAdmFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
        };
        await productAdmFacade.addProduct(input);

        const productDb = await ProductAdmProductModel.findOne({
            where: { id: "1" },
        });

        expect(productDb).toBeDefined;
        expect(productDb.id).toEqual(input.id);
        expect(productDb.name).toEqual(input.name);
        expect(productDb.description).toEqual(input.description);
        expect(productDb.purchasePrice).toEqual(input.purchasePrice);
        expect(productDb.stock).toEqual(input.stock);

    });

    it("should get a product stock", async () => {
        
        const productAdmFacade = ProductAdmFacadeFactory.create();
        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10,
        };
        await productAdmFacade.addProduct(input);
        
        const inputCheckStock = {
            productId: "1"
        };
        const productStock = await productAdmFacade.checkStock(inputCheckStock);

        expect(productStock.productId).toBe(input.id);
        expect(productStock.stock).toBe(input.stock);

    });

});