import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transactionApproved = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
    status: "approved",
});

const MockRepositoryApproved = () => {
    return {
        save: jest.fn().mockReturnValue(transactionApproved)
    }
}

const transactionDeclined = new Transaction({
    id: new Id("1"),
    amount: 99,
    orderId: "1",
    status: "declined",
});

const MockRepositoryDeclined = () => {
    return {
        save: jest.fn().mockReturnValue(transactionDeclined)
    }
}

describe("Process Payment UseCase unit test", () => {
    it("should approve a transaction", async () => {
        const paymentRepository = MockRepositoryApproved();
        const useCase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            amount: 100,
            orderId: "1"
        };

        const result = await useCase.execute(input);

        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.transactionId).toBe(transactionApproved.id.id);
        expect(result.orderId).toBe("1");
        expect(result.amount).toBe(100);
        expect(result.status).toBe("approved");
        expect(result.createdAt).toStrictEqual(transactionApproved.createdAt);
        expect(result.updatedAt).toStrictEqual(transactionApproved.updatedAt);
    });

    it("should decline a transaction", async () => {
        const paymentRepository = MockRepositoryDeclined();
        const useCase = new ProcessPaymentUseCase(paymentRepository);
        const input = {
            amount: 99,
            orderId: "1"
        };

        const result = await useCase.execute(input);

        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.transactionId).toBe(transactionDeclined.id.id);
        expect(result.orderId).toBe("1");
        expect(result.amount).toBe(99);
        expect(result.status).toBe("declined");
        expect(result.createdAt).toStrictEqual(transactionDeclined.createdAt);
        expect(result.updatedAt).toStrictEqual(transactionDeclined.updatedAt);
    });
});