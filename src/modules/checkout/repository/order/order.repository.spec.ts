import { Sequelize } from "sequelize-typescript";
import OrderModel from "./order.model";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client/client.entity";
import Product from "../../domain/product/product.entity";
import Order from "../../domain/order/order.entity";
import OrderRepository from "./order.repository";
import CheckoutClientModel from "../client/client.model";
import CheckoutProductModel from "../product/product.model";

describe("OrderRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([OrderModel, CheckoutProductModel, CheckoutClientModel]);
    await sequelize.sync();
  });

//   afterEach(async () => {
//     await sequelize.close();
//   });

  it("should add a new order", async () => {
    const orderProps = {
       id: new Id("1"),
       status: "approved",
       client: new Client ({
            id: new Id("1c"),
            name: "John Doe",
            address: "Rua dos Bobos",
            email: "a@a.com"
       }),    
       products: [
        new Product({
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1",
            salesPrice: 10,
        }),
        new Product({
            id: new Id("2"),
            name: "Product 2",
            description: "Product 2",
            salesPrice: 20,
        }),
      ],
      createdAt: new Date(),
    };
    const order = new Order(orderProps);
    const repository = new OrderRepository();
    await repository.addOrder(order);

    const orderDb = await OrderModel.findOne({
       where: { id: orderProps.id.id },
       include: [{ model: CheckoutProductModel }, { model: CheckoutClientModel }],
    });
    
    expect(orderProps.id.id).toEqual(orderDb.id);
    expect(orderProps.status).toEqual(orderDb.status);
    expect(orderProps.client.id.id).toEqual(orderDb.client.id);
    expect(orderProps.client.name).toEqual(orderDb.client.name);
    expect(orderProps.client.address).toEqual(orderDb.client.address);
    expect(orderProps.client.email).toEqual(orderDb.client.email);
    expect(orderProps.products[0].id.id).toEqual(orderDb.products[0].id);
    expect(orderProps.products[0].name).toEqual(orderDb.products[0].name);
    expect(orderProps.products[0].description).toEqual(orderDb.products[0].description);
    expect(orderProps.products[0].salesPrice).toEqual(orderDb.products[0].salesPrice);
    expect(orderProps.products[1].id.id).toEqual(orderDb.products[1].id);
    expect(orderProps.products[1].name).toEqual(orderDb.products[1].name);
    expect(orderProps.products[1].description).toEqual(orderDb.products[1].description);
    expect(orderProps.products[1].salesPrice).toEqual(orderDb.products[1].salesPrice);
    
  });

  it("should find an order", async () => {
    const repository = new OrderRepository();
    const orderProps = {
      id: new Id("1"),
      status: "approved",
      client: new Client ({
           id: new Id("1c"),
           name: "John Doe",
           address: "Rua dos Bobos",
           email: "a@a.com"
      }),    
      products: [
       new Product({
           id: new Id("1"),
           name: "Product 1",
           description: "Product 1",
           salesPrice: 10,
       }),
       new Product({
           id: new Id("2"),
           name: "Product 2",
           description: "Product 2",
           salesPrice: 20,
       }),
     ],
     createdAt: new Date(),
    };
    const orderSave = new Order(orderProps);      
    await repository.addOrder(orderSave);
      
    const order = await repository.findOrder("1");
      
    expect(order.id.id).toEqual(orderProps.id.id);
    expect(order.status).toEqual(orderProps.status);
    expect(order.client.id.id).toEqual(orderProps.client.id.id);
    expect(order.client.name).toEqual(orderProps.client.name);
    expect(order.client.address).toEqual(orderProps.client.address);
    expect(order.client.email).toEqual(orderProps.client.email);
    expect(order.products[0].id.id).toEqual(orderProps.products[0].id.id);
    expect(order.products[0].name).toEqual(orderProps.products[0].name);
    expect(order.products[0].description).toEqual(orderProps.products[0].description);
    expect(order.products[0].salesPrice).toEqual(orderProps.products[0].salesPrice);
    expect(order.products[1].id.id).toEqual(orderProps.products[1].id.id);  
    expect(order.products[1].name).toEqual(orderProps.products[1].name);
    expect(order.products[1].description).toEqual(orderProps.products[1].description);
    expect(order.products[1].salesPrice).toEqual(orderProps.products[1].salesPrice);
    expect(order.total).toEqual(30);

    
  });

  it("should throw an error when order is not found ", async () => {
    const invoiceRepository= new OrderRepository();
    const id = '11222';
    expect(async () => {
        await invoiceRepository.findOrder(id);
    }).rejects.toThrow(`Order with id ${id} not found`);
  });

});