export interface IProduct {
    id?: number,
    name: string,
    price: number,
    quantity: number,
    description: string,
    status: boolean,
    categoryId: number,
    sizeNotApplicable: boolean,
    colorNotApplicable: boolean
}
