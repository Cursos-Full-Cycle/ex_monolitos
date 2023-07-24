import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client/client.entity";
import Order from "../../domain/order/order.entity";
import Product from "../../domain/product/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import CheckoutClientModel from "../client/client.model";
import CheckoutProductModel from "../product/product.model";
import OrderModel from "./order.model";

export default class OrderRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        await CheckoutProductModel.destroy({
            where: { id: order.products.map((product) => product.id.id) },
        });

        await CheckoutClientModel.destroy({
            where: { id: order.client.id.id },
        });

        await OrderModel.create(
            {
              id: order.id.id,              
              client: {
                id: order.client.id.id,
                name: order.client.name,                
                email: order.client.email,
                address: order.client.address,                                
              },
              products: order.products.map((product) => ({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,                
              })),
              status: order.status,
              createdAt: order.createdAt,
              updatedAt: order.updatedAt,

            },
            {
              include: [{ model: CheckoutProductModel },
                        { model: CheckoutClientModel }],
            }
        );
    }
    async findOrder(id: string): Promise<Order> {
        const order = await OrderModel.findOne({
            where: { id },
            include: [{ model: CheckoutProductModel }, 
                      { model: CheckoutClientModel }],
        });
        
        if (!order) {
          throw new Error(`Order with id ${id} not found`);
        }

        return new Order({
            id: new Id(order.id),
            client: new Client({
                id: new Id(order.client.id),
                name: order.client.name,
                email: order.client.email,
                address: order.client.address,
            }),
            products: order.products.map((product) =>
                    new Product({
                        id: new Id(product.id),
                        name: product.name,
                        description: product.description,
                        salesPrice: product.salesPrice,
                    })
            ),
            status: order.status,
        });                
    }
}