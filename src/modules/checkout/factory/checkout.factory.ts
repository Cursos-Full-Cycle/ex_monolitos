import ClientAdmFacade from "../../client-adm/facade/client-adm.facade";
import ClientRepository from "../../client-adm/repository/client.repository";
import AddClientUseCase from "../../client-adm/usecase/add-client/add-client.usecase";
import FindClientUseCase from "../../client-adm/usecase/find-client/find-client.usecase";
import InvoiceFacade from "../../invoice/facade/invoice.facade";
import InvoiceRepository from "../../invoice/repository/invoice/invoice.repository";
import FindInvoiceUseCase from "../../invoice/usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../../invoice/usecase/generate-invoice/generate-invoice.usecase";
import PaymentFacade from "../../payment/facade/payment.facade";
import TransactionRepository from "../../payment/repository/transaction.repository";
import ProcessPaymentUseCase from "../../payment/usecase/process-payment/process-payment.usecase";
import ProductAdmFacade from "../../product-adm/facade/product-adm.facade";
import AddProductUseCase from "../../product-adm/usecase/add-product/add-product.usecase";
import StockProductUseCase from "../../product-adm/usecase/stock-product/stock-product.usecase";
import StoreCatalogFacade from "../../store-catalog/facade/store-catalog.facade";
import FindProductUseCase from "../../store-catalog/usecase/find-product/find-product.usecase";
import OrderRepository from "../repository/order/order.repository";
import FindAllProductsUseCase from "../../store-catalog/usecase/find-all-products/find-all-products.usecase";
import ProductRepository from "../../product-adm/repository/product.repository";
import CheckoutFacade from "../facade/checkout.facade";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import ProductStoreCatalogRepository from "../../store-catalog/repository/product.repository";


export default class CheckoutFacadeFactory {
    static create() {
        const orderRepository = new OrderRepository();        
        const clientRepository = new ClientRepository();
        const findClientUseCase = new FindClientUseCase(clientRepository);
        const addClientUseCase = new AddClientUseCase(clientRepository);
        const clientFacade = new ClientAdmFacade({
            findUseCase: findClientUseCase,
            addUseCase: addClientUseCase,
        });

        const productAdmRepository = new ProductRepository();
        const addProductUseCase =  new AddProductUseCase(productAdmRepository);
        const checkStockUseCase = new StockProductUseCase(productAdmRepository);
        const productFacade = new ProductAdmFacade({
            addUseCase: addProductUseCase,
            stockUseCase: checkStockUseCase,
        });
        
        const productStoreCatalogRepository = new ProductStoreCatalogRepository();
        const findUseCase = new FindProductUseCase(productStoreCatalogRepository);        
        const findAllUseCase = new FindAllProductsUseCase(productStoreCatalogRepository);
        const catalogFacade = new StoreCatalogFacade({
            findUseCase: findUseCase,
            findAllUseCase: findAllUseCase,
        });

        const invoiceRepository = new InvoiceRepository();
        const find = new FindInvoiceUseCase(invoiceRepository);
        const generate = new GenerateInvoiceUseCase(invoiceRepository);
        const invoiceFacade = new InvoiceFacade({
            find: find,
            generate: generate,
        });
        const transactionRepository = new TransactionRepository();
        const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepository);
        const paymentFacade = new PaymentFacade(processPaymentUseCase);

        const placeOrderUseCase = new PlaceOrderUseCase(
            clientFacade,
            productFacade,
            catalogFacade,
            orderRepository,
            invoiceFacade,
            paymentFacade
        );

        return new CheckoutFacade(placeOrderUseCase);
    }
}