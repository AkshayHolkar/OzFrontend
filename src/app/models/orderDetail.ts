export interface IOrderDetail {
    id?: number,
    orderId: number,
    productId: number,
    productName: string,
    color?: string,
    size?: string,
    quantity: number,
    totlaPrice: number,
}
