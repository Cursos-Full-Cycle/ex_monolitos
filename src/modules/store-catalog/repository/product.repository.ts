import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";

export default class ProductRepository implements ProductGateway {
    findAll(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }    
}