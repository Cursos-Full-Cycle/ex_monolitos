import express, { Request, Response } from "express";
import PlaceOrderUseCase from "../../modules/checkout/usecase/place-order/place-order.usecase";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../modules/store-catalog/factory/facade.factory";
import OrderRepository from "../../modules/checkout/repository/order/order.repository";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoice.factory";
import PaymentFacadeFactory from "../../modules/payment/factory/payment.facade.factory";
import { PlaceOrderInputDto } from "../../modules/checkout/usecase/place-order/place-order.dto";


export const checkoutRoute = express.Router();
const useCase = new PlaceOrderUseCase(
  ClientAdmFacadeFactory.create(),
  ProductAdmFacadeFactory.create(),
  StoreCatalogFacadeFactory.create(),
  new OrderRepository(),
  InvoiceFacadeFactory.create(),
  PaymentFacadeFactory.create()
);

checkoutRoute.post("/", async (request: Request, response: Response) => {
  try {
    const { clientId, products } = request.body;

    const input: PlaceOrderInputDto = {
      clientId,
      products,
    };

    const output = await useCase.execute(input);

    response.status(200).send(output);
  } catch (error) {
    console.error(error);
    response.status(500).send(error);
  }
});