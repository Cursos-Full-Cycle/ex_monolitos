import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";


export interface UseCaseProps {
    findUseCase: UseCaseInterface;
    addUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    private _findUseCase : UseCaseInterface;
    private _addUseCase : UseCaseInterface;

    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUseCase;
        this._addUseCase = props.addUseCase;
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addUseCase.execute(input);
    }
    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findUseCase.execute(input);
    }
}