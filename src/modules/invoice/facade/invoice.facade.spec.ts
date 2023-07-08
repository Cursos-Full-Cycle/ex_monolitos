import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.factory";

describe("InvoiceFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });

        await sequelize.addModels([ProductModel, InvoiceModel]);
        await sequelize.sync();
    });

    // afterEach(async () => {
    //     await sequelize.close();
    // });

    it("should generate an invoide", async () => {
        
        const invoiceFacade = InvoiceFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            document: "123456789",
            street: "Rua 1",
            number: "123",
            complement: "Complemento 1",
            city: "Cidade 1",
            state: "Estado 1",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 10,
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: 20,
                },
            ],
        };
            
        await invoiceFacade.generate(input);

        const invoice = await InvoiceModel.findOne({
            where: { id: "1" },
            include: [{ model: ProductModel }],
        });
        
        expect(invoice).toBeDefined;
        expect(invoice.id).toEqual(input.id);
        expect(invoice.name).toEqual(input.name);
        expect(invoice.document).toEqual(input.document);
        expect(invoice.street).toEqual(input.street);
        expect(invoice.number).toEqual(input.number);
        expect(invoice.complement).toEqual(input.complement);
        expect(invoice.city).toEqual(input.city);
        expect(invoice.state).toEqual(input.state);
        expect(invoice.zipCode).toEqual(input.zipCode);
        expect(invoice.items.length).toEqual(input.items.length);
        expect(invoice.items[0].id).toEqual(input.items[0].id);
        expect(invoice.items[0].name).toEqual(input.items[0].name);
        expect(invoice.items[0].price).toEqual(input.items[0].price);
        expect(invoice.items[1].id).toEqual(input.items[1].id);
        expect(invoice.items[1].name).toEqual(input.items[1].name);
        expect(invoice.items[1].price).toEqual(input.items[1].price);
        expect(invoice.createdAt).toBeDefined;
        expect(invoice.updatedAt).toBeDefined;        

    });

    it("should find an invoice", async () => {
        
        const invoiceFacade = InvoiceFacadeFactory.create();
        
        const input = {
            id: "1",
            name: "Product 1",
            document: "123456789",
            street: "Rua 1",
            number: "123",
            complement: "Complemento 1",
            city: "Cidade 1",
            state: "Estado 1",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 10,
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: 20,
                },
            ],
        };
            
        await invoiceFacade.generate(input);
        
        const inputFindInvoice = {
            id: "1"
        };
        const invoice = await invoiceFacade.find(inputFindInvoice);

        expect(invoice).toBeDefined;
        expect(invoice.id).toEqual(input.id);
        expect(invoice.name).toEqual(input.name);
        expect(invoice.document).toEqual(input.document);
        expect(invoice.address.street).toEqual(input.street);
        expect(invoice.address.number).toEqual(input.number);
        expect(invoice.address.complement).toEqual(input.complement);
        expect(invoice.address.city).toEqual(input.city);
        expect(invoice.address.state).toEqual(input.state);
        expect(invoice.address.zipCode).toEqual(input.zipCode);
        expect(invoice.items.length).toEqual(input.items.length);
        expect(invoice.items[0].id).toEqual(input.items[0].id);
        expect(invoice.items[0].name).toEqual(input.items[0].name);
        expect(invoice.items[0].price).toEqual(input.items[0].price);
        expect(invoice.items[1].id).toEqual(input.items[1].id);
        expect(invoice.items[1].name).toEqual(input.items[1].name);
        expect(invoice.items[1].price).toEqual(input.items[1].price);
        expect(invoice.createdAt).toBeDefined;
        expect(invoice.total).toEqual(30);


    //     expect(productStock.stock).toBe(input.stock);

    });

});