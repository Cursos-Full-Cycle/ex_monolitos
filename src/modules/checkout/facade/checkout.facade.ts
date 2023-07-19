import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import CheckoutFacadeInterface, { PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from "./checkout.facade.interface";

export default class CheckoutFacade implements CheckoutFacadeInterface {
    
    constructor(private placeOrderUseCase: UseCaseInterface) {        
    }
    async placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {
        return await this.placeOrderUseCase.execute(input);
    }
    
}