import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCasesProps {
   generate: UseCaseInterface,
   find: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    
    private _findUseCase: UseCaseInterface;
    private _generateUseCase: UseCaseInterface;
    
    constructor(useCaseProps: UseCasesProps) {
        this._findUseCase = useCaseProps.find;
        this._generateUseCase = useCaseProps.generate;
    }

    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._findUseCase.execute(input);
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateUseCase.execute(input);
    }

}