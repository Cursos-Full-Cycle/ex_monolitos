import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
    name: "Product 1",
    email: "a@a.com",
    document: "00000000000",
    address: "Address 1",
    number: "1",
    complement: "Complement 1",
    city: "City 1",
    state: "State 1",
    zipCode: "ZipCode 1",
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
        expect(result.document).toEqual(client.document);
        expect(result.address).toEqual(client.address);     
        expect(result.number).toEqual(client.number);
        expect(result.complement).toEqual(client.complement);
        expect(result.city).toEqual(client.city);
        expect(result.state).toEqual(client.state);
        expect(result.zipCode).toEqual(client.zipCode);        
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);
    });
});