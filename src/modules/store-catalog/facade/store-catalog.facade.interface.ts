export interface FindAllStoreCatalogFacadeOutputDto {
    products: {
        id?: string;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}

export interface FindStoreCatalogFacadeInputDto {
    id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
    id?: string;
    name: string;
    description: string;
    salesPrice: number;
}

export default interface StoreCatalogFacadeInterface {
    findAll() : Promise<FindAllStoreCatalogFacadeOutputDto>;
    find(input: FindStoreCatalogFacadeInputDto) : Promise<FindStoreCatalogFacadeOutputDto>;
}