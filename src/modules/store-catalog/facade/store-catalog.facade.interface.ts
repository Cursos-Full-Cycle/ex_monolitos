export interface FindAllProductFacadeOutputDto {
    id?: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface FindProductFacadeInputDto {
    productId: string;
}

export interface FindProductFacadeOutputDto {
    id?: string;
    name: string;
    description: string;
    salesPrice: number;
}

export default interface ProductAdmFacadeInterface {
    findAll() : Promise<FindAllProductFacadeOutputDto>;
    find(input: FindProductFacadeInputDto) : Promise<FindProductFacadeOutputDto>;
}