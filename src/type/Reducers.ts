export interface Category {
    id: number
    name: string
    image: string
}

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: Category
    images: string[]
}

export interface User{
    id: number
    email: string
    password: string
    name: string
    role: string
    avatar: string
    creationAt: string
    updatedAt: string
}

export interface Auth {
    loggedIn: boolean
    userInfo: User | null
}

export interface CartWishlist {
    [key: string] : Product[]
}

export interface AddCartWishList {
    email: string
    productInfo: Product
}

export interface RemoveCartWishList {
    productId: number
    email: string
}