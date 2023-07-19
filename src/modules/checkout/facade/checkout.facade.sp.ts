import { Sequelize } from "sequelize-typescript";
import OrderModel from "../repository/order/order.model";
import CheckoutFacadeFactory from "../factory/checkout.factory";
import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import ClientModel from "../../client-adm/repository/client.model";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogProductModel from "../../store-catalog/repository/product.model";
import ProductAdmProductModel from "../../product-adm/repository/product.model";
import ProductModel from "../repository/product/product.model";

describe("Client-adm facade test", () => {
    let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel, ProductAdmProductModel, ClientModel, OrderModel, StoreCatalogProductModel]);
    await sequelize.sync();
  });

  it("should Place and Order", async () => {    
    const facade = CheckoutFacadeFactory.create();

    const clientAdmFacade = ClientAdmFacadeFactory.create();
    await clientAdmFacade.add({
        id: "1",
        name: "John Doe",
        email: "a@a.com",
        document: "123456789",
        address: "Rua 1",
        number: "123",
        complement: "Casa",
        city: "São Paulo",
        state: "SP",
        zipCode: "12345678",
    });

    // await ClientModel.create({
    //     id: "1",
    //     name: "John Doe",
    //     email: "@a.com",        
    //     address: "Rua 1",
    // });

    const productAdmFacade = ProductAdmFacadeFactory.create();
    await productAdmFacade.addProduct({
        id: "1",
        name: "Product 1",
        description: "Product 1 description",
        purchasePrice: 100,
        stock: 10,
    });
    
    await productAdmFacade.addProduct({
        id: "2",
        name: "Product 2",
        description: "Product 2 description",
        purchasePrice: 200,
        stock: 10,
    });
    // await ProductAdmProductModel.create({
    //     id: "1",
    //     name: "Product 1",
    //     description: "Product 1 description",
    //     purchasePrice: 100,
    //     stock: 10,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    // });

    // await ProductModel.create({
    //     id: "2",
    //     name: "Product 2",
    //     description: "Product 2 description",
    //     salesPrice: 200,
    // });

    const input = {
        clientId: "1",
        products: [
            {
                productId: "1",
            },
            {
                productId: "2",
            },
        ],
    };

    const order = await facade.placeOrder(input);

    // expect(order).toBeDefined;
    // expect(order.id).toBeDefined;
    // expect(order.invoiceId).toBeDefined;
    // expect(order.status).toEqual("PENDING");
    // expect(order.total).toEqual(200);
    // expect(order.products.length).toEqual(2);    
    

//     const input = {
//         id: "1",
//         name: "John Doe",
//         email: "a@a.com",
//         document: "123456789",
//         address: "Rua 1",
//         number: "123",
//         complement: "Casa",
//         city: "São Paulo",
//         state: "SP",
//         zipCode: "12345678",
//     };
//     await facade.add(input);

//     const clientDb = await ClientModel.findOne({ where: { id: input.id } });

//     expect(clientDb.id).toEqual(input.id);
//     expect(clientDb.name).toEqual(input.name);
//     expect(clientDb.email).toEqual(input.email);
//     expect(clientDb.document).toEqual(input.document);
//     expect(clientDb.address).toEqual(input.address);    
//     expect(clientDb.number).toEqual(input.number);
//     expect(clientDb.complement).toEqual(input.complement);
//     expect(clientDb.city).toEqual(input.city);
//     expect(clientDb.state).toEqual(input.state);
//     expect(clientDb.zipCode).toEqual(input.zipCode);

  });

//   it("should find a client", async () => {    
//     const facade = ClientAdmFacadeFactory.create();

//     const input = {
//         id: "1",
//         name: "John Doe",
//         email: "a@a.com",
//         document: "123456789",
//         address: "Rua 1",
//         number: "123",
//         complement: "Casa",
//         city: "São Paulo",
//         state: "SP",
//         zipCode: "12345678",
//     };
//     await facade.add(input);

//     const client = await facade.find({id: "1"});

//     expect(client.id).toEqual(input.id);
//     expect(client.name).toEqual(input.name);
//     expect(client.email).toEqual(input.email);
//     expect(client.document).toEqual(input.document);
//     expect(client.address).toEqual(input.address);
//     expect(client.number).toEqual(input.number);
//     expect(client.complement).toEqual(input.complement);
//     expect(client.city).toEqual(input.city);
//     expect(client.state).toEqual(input.state);
//     expect(client.zipCode).toEqual(input.zipCode);
    
//   });
});