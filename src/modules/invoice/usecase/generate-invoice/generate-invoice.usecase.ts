import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";
import GenerateInvoiceUsecaseMapper from "./generate-invoice.usecase.mapper ";


export default class GenerateInvoiceUseCase implements UseCaseInterface {
    
    constructor(private invoiceRepository: InvoiceGateway) {}

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        
        const entity = GenerateInvoiceUsecaseMapper.toEntity(input);
        await this.invoiceRepository.generate(entity);

        return GenerateInvoiceUsecaseMapper.toOutput(entity);        
    }
}