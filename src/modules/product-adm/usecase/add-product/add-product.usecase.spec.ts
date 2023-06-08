import AddProductUsecase from "./add-product.usecase";

describe("Add product usecase unit test", () => {
    
    const MockRepository = () => ({
        add: jest.fn(),
        find: jest.fn(),
    });

    it("should add a product", async () => {        
        const productRepository = MockRepository();        
        const usecase = new AddProductUsecase(productRepository);

        const input = {
            name: "product name",
            description: "product description",
            purchasePrice: 10,
            stock: 10,
        };
        const result = await usecase.execute(input);
        
        expect(productRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined;
        expect(result.name).toBe(input.name);
        expect(result.description).toBe(input.description);
        expect(result.purchasePrice).toBe(input.purchasePrice);
        expect(result.stock).toBe(input.stock);
        
    });

});