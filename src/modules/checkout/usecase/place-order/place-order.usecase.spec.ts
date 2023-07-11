import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
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

        it("should return a product", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue({
                    id: "1",
                    name: "Product 1",
                    description: "Product 1 description",
                    salesPrice: 100,
                }),
            }

            //@ts-expect-error - force set catalogFacade
            placeOrderUsecase["_catalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUsecase["getProduct"]("1")).resolves.toEqual(
                new Product({
                    id: new Id("1"),
                    name: "Product 1",
                    description: "Product 1 description",
                    salesPrice: 100,
                })
            );

            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);

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

        describe("place an order", () => {
            // const clientProps = {
            //     id: "1c",
            //     name: "Client 1",
            //     document: "00000000000",
            //     email: "client@user.com",
            //     street: "Client street",
            //     number: "1",
            //     complement: "Client complement",
            //     city: "Client city",
            //     state: "Client state",
            //     zipCode: "00000000",
            // };

            // const mockClientFacade = {
            //     find: jest.fn().mockResolvedValue(clientProps),
            // };

            // const mockPaymentFacade = {
            //     pay: jest.fn()
            // };

            // const mockCheckoutRepository = {
            //     addOrder: jest.fn()
            // };

            // const mockInvoiceFacade = {
            //     generate: jest.fn().mockResolvedValue({id: "1i"})
            // };

            // const placeOrderUsecase = new PlaceOrderUseCase(
            //     mockClientFacade,
            //     null,
            //     null,
            //     mockCheckoutRepository,
            //     mockInvoiceFacade,
            //     mockPaymentFacade
            // );

            // const products = {
            //     "1" : new Product({
            //         id: new Id("1"),
            //         name: "Product 1",
            //         description: "Product 1 description",
            //         salesPrice: 100,
            //     }),
            //     "2" : new Product({
            //         id: new Id("2"),
            //         name: "Product 2",
            //         description: "Product 2 description",
            //         salesPrice: 200,
            //     }),
            // };

            // const mockValidateProducts = jest
            //     //@ts-expect-error - spy on private method
            //     .spyOn(placeOrderUseCase, "validateProducts")
            //     //@ts-expect-error - spy on private method
            //     .mockResolvedValue(null);
            
            // const mockGetProduct = jest
            //     //@ts-expect-error - spy on private method
            //     .spyOn(placeOrderUseCase, "getProduct")
            //     //@ts-expect-error - not return never
            //     .mockImplementation((productId: keyof typeof products) => {
            //         return products[productId];
            //     });
            
            // it("should not be approved", async () => {
            //     mockPaymentFacade.process = mockPaymentFacade.process.mockResolvedValue({
            //         transactionId: "1t",
            //         orderId: "1o",
            //         amount: 100,
            //         status: "error",
            //         createdAt: new Date(),
            //         updatedAt: new Date(),
            //     });
                
            //     const input: PlaceOrderInputDto = {
            //         clientId: "1c",
            //         products: [ { productId: "1" }, {productId: "2"} ]
            //     };

            //     let output = await placeOrderUsecase.execute(input);

            //     expect(output.invoiceId).toBeNull();
            //     expect(output.total).toBe(300);
            //     expect(output.products).toStrictEqual([
            //         {productId: "1"},
            //         {productId: "2"}
            //     ]);
            //     expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
            //     expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c"});
            //     expect(mockValidateProducts).toHaveBeenCalledTimes(1);
            //     expect(mockValidateProducts).toHaveBeenCalledWith(input);
            //     expect(mockGetProduct).toHaveBeenCalledTimes(2);
            //     expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
            //     expect(mockPaymentFacade)


            // })

        })
    })
})