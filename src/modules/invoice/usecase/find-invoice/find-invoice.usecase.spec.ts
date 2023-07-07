import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import Address from "../../valueobject/address.valueobject";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
    id: new Id("1"),
    name: "John Doe",
    document: "123456789",
    address: new Address ({
        street: "Rua 1",
        number: "123",
        complement: "apto 1",
        city: "São Paulo",
        state: "SP",
        zipCode: "12345678",
    }),
    items: [
        new Product({
            id: new Id("1"),
            name: "Product 1",
            price: 100,                      
        }),
        new Product({
            id: new Id("2"),
            name: "Product 2",
            price: 200,
        }),
    ]    
    });

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(invoice),
        generate: jest.fn(),
    }
}

describe("Find invoice UseCase unit test", () => {
    it("should find a invoice", async () => {
        const invoiceRepository = MockRepository();
        const useCase = new FindInvoiceUseCase(invoiceRepository);

        const input = {
            id: "1"
        };

        const result = await useCase.execute(input);

        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(result.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
    });    
});