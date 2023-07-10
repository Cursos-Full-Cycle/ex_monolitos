import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";
const mockDate = new Date(2000,1,1);
describe("PlaceOrderUseCase unit test", () => {
    describe("validateProducts method", () => {
        //@ts-expect-error - no params in constructor
        const placeOrderUsecase = new PlaceOrderUseCase();
        it("should throw an error if no products are selected", async () => {
            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: []
            }
            await expect(placeOrderUsecase["validateProducts"](input)).rejects.toThrow(
                new Error("No products selectd")
            );
        })

        it("should throw an error when product is out of stock", async () => {
            const mockProductFacade = {
                checkStock: jest.fn(({productId}: {productId: string}) =>
                    Promise.resolve( {
                        productId,
                        stock: productId === "1" ? 0 : 1
                    }))
            }

            //@ts-expect-error - force set productFacade
            placeOrderUsecase["_productFacade"] = mockProductFacade;
            let input: PlaceOrderInputDto = {
                clientId: "1",
                products: [ { productId: "1" } ]
            }
            
            await expect(placeOrderUsecase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 1 is not available in stock")
            );

            input = {
                clientId: "1",
                products: [ { productId: "0" }, {productId: "1"} ]
            }
            
            await expect(placeOrderUsecase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 1 is not available in stock")
            );
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

            input = {
                clientId: "1",
                products: [ { productId: "0" }, {productId: "1"}, {productId: "2"} ]
            }
            
            await expect(placeOrderUsecase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 1 is not available in stock")
            );
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);




        })
    })

    describe("getProducts method", () => {
        beforeAll(() => {
            // jest.useFakeTimers( { legacyFakeTimers:true} );
            jest.useFakeTimers( );
            jest.setSystemTime(mockDate);
        })

        afterAll(() => {
            jest.useRealTimers();
        })
        //@ts-expect-error - no params in constructor
        const placeOrderUsecase = new PlaceOrderUseCase();
        it("should throw an error when product not found", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(null),
            }
            //@ts-expect-error - force set catalogFacade
            placeOrderUsecase["_catalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUsecase["getProduct"]("0")).rejects.toThrow(
                new Error("Product not found")
            );
        })
    })

    describe("execute method", () => {
        it("should throw an error when client not found", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null),
            }
            //@ts-expect-error - no params in constructor
            const placeOrderUsecase = new PlaceOrderUseCase();
            //@ts-expect-error - force set clientFacade
            placeOrderUsecase["_clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            }
            
            await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
                new Error("Client not found")
            );
        })

        it("should throw an error when products are not valid", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true),
            }

            //@ts-expect-error - no params in constructor
            const placeOrderUsecase = new PlaceOrderUseCase();
            
            const mockValidateProducts = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUsecase, "validateProducts")
                //@ts-expect-error - not return never
                .mockRejectedValue(new Error("No products selectd"));

            //@ts-expect-error - force set clientFacade
            placeOrderUsecase["_clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: []
            }

            await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
                new Error("No products selectd")
            );
            expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        })
    })
})