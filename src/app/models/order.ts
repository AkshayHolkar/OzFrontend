import { IOrderDetail } from "./orderDetail";

export interface IOrder {
    id?: number,
    dateCreation: Date,
    customerId?: string,
    orderStatus?: string
}
