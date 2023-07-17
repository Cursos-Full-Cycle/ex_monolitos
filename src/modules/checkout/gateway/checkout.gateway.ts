import Order from "../domain/order/order.entity";

export default interface CheckoutGateway {
    addOrder(order: Order) : Promise<void>;
    findOrder(id: string): Promise<Order | null>;
}