import AddClientUseCase from "./add-client.usecase";

const mockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};

describe("Add Client UseCase test", () => {
    it("Should add a client", async () => {
        const repository = mockRepository();
        const useCase = new AddClientUseCase(repository);
        const input = {            
            name: "John Doe",
            email: "a@a.com",
            document: "123456789",
            address: "Rua 1",
            number: "123",
            complement: "Casa",
            city: "São Paulo",
            state: "SP",
            zipCode: "12345678",
        };

        const result = await useCase.execute(input);

        expect(repository.add).toBeCalledTimes(1);
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.document).toEqual(input.document);
        expect(result.address).toEqual(input.address);        
        expect(result.number).toEqual(input.number);
        expect(result.complement).toEqual(input.complement);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipCode).toEqual(input.zipCode);
        
    });
});