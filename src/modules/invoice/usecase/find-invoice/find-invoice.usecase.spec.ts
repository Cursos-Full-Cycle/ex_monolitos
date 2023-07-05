import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import Address from "../../valueobject/address.valueobject";

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
        find: jest.fn().mockReturnValue(invoice)
    }
}

describe("Find invoice UseCase unit test", () => {
    it("should find a invoice", async () => {
        // const invoiceRepository = MockRepository();
        // const useCase = new FindInvoiceUseCase(invoiceRepository);
        // const input = {
        //     id: "1"
        // };

        // const result = await useCase.execute(input);

        // expect(invoiceRepository.find).toHaveBeenCalled();
        // expect(result.transactionId).toBe(transactionApproved.id.id);
        // expect(result.orderId).toBe("1");
        // expect(result.amount).toBe(100);
        // expect(result.status).toBe("approved");
        // expect(result.createdAt).toStrictEqual(transactionApproved.createdAt);
        // expect(result.updatedAt).toStrictEqual(transactionApproved.updatedAt);
    });

    // it("should decline a transaction", async () => {
    //     const paymentRepository = MockRepositoryDeclined();
    //     const useCase = new ProcessPaymentUseCase(paymentRepository);
    //     const input = {
    //         amount: 99,
    //         orderId: "1"
    //     };

    //     const result = await useCase.execute(input);

    //     expect(paymentRepository.save).toHaveBeenCalled();
    //     expect(result.transactionId).toBe(transactionDeclined.id.id);
    //     expect(result.orderId).toBe("1");
    //     expect(result.amount).toBe(99);
    //     expect(result.status).toBe("declined");
    //     expect(result.createdAt).toStrictEqual(transactionDeclined.createdAt);
    //     expect(result.updatedAt).toStrictEqual(transactionDeclined.updatedAt);
    // });
});