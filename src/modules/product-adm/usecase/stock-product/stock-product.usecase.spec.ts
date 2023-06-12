import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import StockProductUseCase from "./stock-product.usecase";

describe("Stock product usecase unit test", () => {
    const product = new Product({
        id: new Id("1"),
        name: "Product",
        description: "Product description",
        purchasePrice: 100,
        stock: 10,
      });

    const MockRepository = () => ({
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    });

    it("should get a product stock", async () => {        

        const productRepository = MockRepository();        
        const usecase = new StockProductUseCase(productRepository);

        const input = {
            productId: "01",
        };
        const result = await usecase.execute(input);
        
        expect(productRepository.find).toHaveBeenCalled();
        expect(result.productId).toBeDefined;
        expect(result.stock).toBeDefined;        
        
    });

});