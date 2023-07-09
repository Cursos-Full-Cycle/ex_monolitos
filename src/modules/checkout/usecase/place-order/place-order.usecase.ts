import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
    private _clientFacade: ClientAdmFacadeInterface;
    constructor(clientFacade: ClientAdmFacadeInterface) {
        this._clientFacade = clientFacade;
    }

    // constructor() {
        
    // }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {

        const client = await this._clientFacade.find({ id: input.clientId });
        if (!client) {
            throw new Error("Client not found");
        }

        //validar todos os produtos
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
}