import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./payment.facade.interface";

export interface UseCasesProps {
   processPayment: ProcessPaymentUseCase 
}

export default class PaymentFacade implements PaymentFacadeInterface {
    
    constructor(private processPaymentUseCase: UseCaseInterface) {        
    }

    async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return await this.processPaymentUseCase.execute(input);
    }

    
}