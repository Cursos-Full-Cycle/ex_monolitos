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
            address: "Rua 1"
        };

        const result = await useCase.execute(input);

        expect(repository.add).toBeCalledTimes(1);
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.address).toEqual(input.address);        
    });
});