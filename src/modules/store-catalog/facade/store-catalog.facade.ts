
import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";


export interface UseCasesProps {
    findUseCase: FindProductUseCase
    findAllUseCase: FindAllProductsUseCase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    
    private _findUseCase: FindProductUseCase;
    private _findAllUseCase: FindAllProductsUseCase;
    
    constructor(useCaseProps: UseCasesProps) {
        this._findUseCase = useCaseProps.findUseCase;
        this._findAllUseCase = useCaseProps.findAllUseCase;
    }

    async find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findUseCase.execute(input);
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return await this._findAllUseCase.execute();
    }
    
}