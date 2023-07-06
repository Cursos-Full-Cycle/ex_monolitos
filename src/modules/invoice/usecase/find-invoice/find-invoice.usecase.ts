import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import FindInvoiceUsecaseMapper from "./find-invoice-usecase-mapper ";
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "./find-invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
    
    constructor(private invoiceRepository: InvoiceGateway) {}

    async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {
        
        const invoice = await this.invoiceRepository.find(input.id);

        return FindInvoiceUsecaseMapper.toOutput(invoice);        
    }

}