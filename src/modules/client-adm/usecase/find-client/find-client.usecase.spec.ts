import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
    name: "Product 1",
    email: "a@a.com",
    address: "Address 1"    
});

const mockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),        
    };
};

describe("Find Client UseCase unit test", () => {
    it("Should find a client", async () => {
        const repository = mockRepository();
        const useCase = new FindClientUseCase(repository);
        const input = {            
            id: "1"
        };

        const result = await useCase.execute(input);

        expect(repository.find).toBeCalledTimes(1);
        expect(result.id).toBe(input.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);     
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);
    });
});