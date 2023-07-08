import GenerateInvoiceUseCase from "./generate-invoice.usecase";


const MockRepository = () => {
    return {
        find: jest.fn(),
        generate: jest.fn(),
    }
}

describe("Generate invoice UseCase unit test", () => {
    it("should generate an invoice", async () => {
        const invoiceRepository = MockRepository();
        const useCase = new GenerateInvoiceUseCase(invoiceRepository);

        const invoiceInput = {
            id: "1",
            name: "John Doe",
            document: "123456789",
            street: "Rua 1",
            number: "123",
            complement: "apto 1",
            city: "São Paulo",
            state: "SP",
            zipCode: "12345678",            
            items: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 100,                      
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: 200,
                },
            ]    
        };

        const result = await useCase.execute(invoiceInput);

        expect(invoiceRepository.generate).toHaveBeenCalled();
        expect(result.id).not.toBeNull();
        expect(result.name).toEqual(invoiceInput.name);
        expect(result.document).toEqual(invoiceInput.document);
        expect(result.street).toEqual(invoiceInput.street);
        expect(result.number).toEqual(invoiceInput.number);
        expect(result.complement).toEqual(invoiceInput.complement);
        expect(result.city).toEqual(invoiceInput.city);
        expect(result.state).toEqual(invoiceInput.state);
        expect(result.zipCode).toEqual(invoiceInput.zipCode);
        expect(result.items[0].id).toEqual(invoiceInput.items[0].id);
        expect(result.items[0].name).toEqual(invoiceInput.items[0].name);
        expect(result.items[0].price).toEqual(invoiceInput.items[0].price);
        expect(result.total).toBe(300);
    });    
});