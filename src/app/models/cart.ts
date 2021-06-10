export interface ICart {
    id?: number,
    customerId?: string,
    productId: number,
    productName: string,
    imageUrl?: string,
    color?: string,
    size?: string,
    quantity: number,
    maxLimit: number,
    price: number
}
