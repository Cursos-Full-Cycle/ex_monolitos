import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;
    constructor(clientFacade: ClientAdmFacadeInterface,
                productFacade: ProductAdmFacadeInterface) {
        this._clientFacade = clientFacade;
        this._productFacade = productFacade;
    }

    // constructor() {
        
    // }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {

        const client = await this._clientFacade.find({ id: input.clientId });
        if (!client) {
            throw new Error("Client not found");
        }

        await this.validateProducts(input);
        //recuper os produtos

        //criar o objeto do client
        //criar o objeto da ordem (client, products)

        //processar o payment

        //caso o pagamento seja aprovado -> gerar o invoice

        //mudar o status da ordem para approved
        //retornar dto


        return {
            id: "1",
            invoiceId: "1",
            status: "pending",
            total: 100,
            products: []
        };        
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0) {
            throw new Error("No products selectd");
        }
        for(const p of input.products) {
            const product = await this._productFacade.checkStock({ productId: p.productId });
            if (product.stock <= 0) {
                throw new Error(`Product ${product.productId} is not available in stock`);
            }
        }
    }
}