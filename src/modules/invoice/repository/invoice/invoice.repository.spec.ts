import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import ProductModel from "../product/product.model";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../valueobject/address.valueobject";
import Product from "../../domain/product/product.entity";
import Invoice from "../../domain/invoice/invoice.entity";

describe("InvoiceRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, ProductModel]);
    await sequelize.sync();
  });

//   afterEach(async () => {
//     await sequelize.close();
//   });

  it("should generate a new invoice", async () => {
    const invoiceProps = {
      id: new Id("1"),
      name: "John Doe",
      document: "12345678901",
      address: new Address({
        street: "Rua dos Bobos",
        number: "0",
        complement: "Apto 101",
        city: "São Paulo",
        state: "SP",
        zipCode: "12345678",
      }),
      items: [
        new Product({
            id: new Id("1"),
            name: "Product 1",
            price: 10,
        }),
        new Product({
            id: new Id("2"),
            name: "Product 2",
            price: 20,
        }),

      ],
      createdAt: new Date(),
    };
    const invoice = new Invoice(invoiceProps);
    const repository = new InvoiceRepository();
    await repository.generate(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invoiceProps.id.id },
      include: [{ model: ProductModel }],
    });
    
    expect(invoiceProps.id.id).toEqual(invoiceDb.id);
    expect(invoiceProps.name).toEqual(invoiceDb.name);
    expect(invoiceProps.document).toEqual(invoiceDb.document);
    expect(invoiceProps.address.street).toEqual(invoiceDb.street);
    expect(invoiceProps.address.number).toEqual(invoiceDb.number);
    expect(invoiceProps.address.complement).toEqual(invoiceDb.complement);
    expect(invoiceProps.address.city).toEqual(invoiceDb.city);
    expect(invoiceProps.address.state).toEqual(invoiceDb.state);
    expect(invoiceProps.address.zipCode).toEqual(invoiceDb.zipCode);
    expect(invoiceProps.items[0].id.id).toEqual(invoiceDb.items[0].id);
    expect(invoiceProps.items[0].name).toEqual(invoiceDb.items[0].name);
    expect(invoiceProps.items[0].price).toEqual(invoiceDb.items[0].price);
  });

  it("should find an invoice", async () => {
    const repository = new InvoiceRepository();
    const invoiceProps = {
        id: new Id("1"),
        name: "John Doe",
        document: "12345678901",
        address: new Address({
          street: "Rua dos Bobos",
          number: "0",
          complement: "Apto 101",
          city: "São Paulo",
          state: "SP",
          zipCode: "12345678",
        }),
        items: [
          new Product({
              id: new Id("1"),
              name: "Product 1",
              price: 10,
          }),
          new Product({
              id: new Id("2"),
              name: "Product 2",
              price: 20,
          }),
  
        ],
        createdAt: new Date(),
    };
    const invoiceSave = new Invoice(invoiceProps);      
    await repository.generate(invoiceSave);
      
    const invoice = await repository.find("1");
      
    expect(invoice.id.id).toEqual(invoiceProps.id.id);
    expect(invoice.name).toEqual(invoiceProps.name);
    expect(invoice.document).toEqual(invoiceProps.document);
    expect(invoice.address.street).toEqual(invoiceProps.address.street);
    expect(invoice.address.number).toEqual(invoiceProps.address.number);
    expect(invoice.address.complement).toEqual(invoiceProps.address.complement);
    expect(invoice.address.city).toEqual(invoiceProps.address.city);
    expect(invoice.address.state).toEqual(invoiceProps.address.state);
    expect(invoice.address.zipCode).toEqual(invoiceProps.address.zipCode);
    expect(invoice.items[0].id.id).toEqual(invoiceProps.items[0].id.id);
    expect(invoice.items[0].name).toEqual(invoiceProps.items[0].name);
    expect(invoice.items[0].price).toEqual(invoiceProps.items[0].price);
    expect(invoice.items[1].id.id).toEqual(invoiceProps.items[1].id.id);
    expect(invoice.items[1].name).toEqual(invoiceProps.items[1].name);
    expect(invoice.items[1].price).toEqual(invoiceProps.items[1].price);
    expect(invoice.total).toEqual(invoiceSave.total);
  });

  it("should throw an error when invoice is not found ", async () => {
    const invoiceRepository= new InvoiceRepository();
    const id = '11222';
    expect(async () => {
        await invoiceRepository.find(id);
    }).rejects.toThrow(`Invoice with id ${id} not found`);
  });

});