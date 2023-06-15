import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 10
});

const MockRepository = () => {
    return {
        findAll: jest.fn(),        
        find: jest.fn().mockReturnValue(Promise.resolve(product)),        
    };
}

describe("Find a product usecase unit teste", () => {
    it("Should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);
        const input = {
            id: "1",
        };
        const product = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(product.id).toBe("1");
        expect(product.name).toBe("Product 1");
        expect(product.description).toBe("Product 1 description");
        expect(product.salesPrice).toBe(10);
    });
});