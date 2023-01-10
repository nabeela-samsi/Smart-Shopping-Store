import { IProduct } from "./Product"
import { IUser } from "./User"

export interface ICartWishlist {
    [userId: number] : IProduct[]
}

export interface IAddCartWishList {
    userId: number
    productInfo: IProduct
    originalPrice?: number
}

export interface IRemoveCartWishList {
    productId: number
    userId: number
    originalPrice?: number
}

export interface IUserInfo{
    userInfo: IUser
}