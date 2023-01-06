import { IProduct } from "./Product"

export interface ICartWishlist {
    [key: string] : IProduct[]
}

export interface IAddCartWishList {
    email: string
    productInfo: IProduct
    originalPrice?: number
}

export interface IRemoveCartWishList {
    productId: number
    email: string
    originalPrice?: number
}