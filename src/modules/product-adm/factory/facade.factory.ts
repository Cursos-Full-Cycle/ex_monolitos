import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import StockProductUseCase from "../usecase/stock-product/stock-product.usecase";

export default class ProductAdmFacadeFactory {
    static create() {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const stockProductUseCase = new StockProductUseCase(productRepository);
        const productAdmFacade = new ProductAdmFacade({ 
            addUseCase: addProductUseCase,
            stockUseCase: stockProductUseCase,
        });
        return productAdmFacade;
    }
}