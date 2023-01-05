export interface ICategory {
    id: number
    name: string
    image: string
}

export interface IProduct {
    id: number
    title: string
    price: number
    description: string
    category: ICategory
    images: string[]
    quantity?: number
}

export interface IUser{
    id: number
    email: string
    password: string
    name: string
    role: string
    avatar: string
}

export interface IAuth {
    loading: boolean
    loggedIn: boolean
    userInfo: IUser | null
    error: boolean
    errorMsg: string
}

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