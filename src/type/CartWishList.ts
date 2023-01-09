import { IProduct } from "./Product"
import { IUser } from "./User"

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

export interface IUserInfo{
    userInfo: IUser
}