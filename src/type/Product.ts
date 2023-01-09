import { ICategory } from "./Category"

export interface IProduct {
    id: number
    title: string
    price: number
    description: string
    category: ICategory
    images: string[]
    quantity?: number
}

export interface ICreateProduct {
    title: string
    price: number
    description: string
    categoryId: number
    images: string | string[]
}

// export interface INewProduct {
//     title: string
//     price: number
//     description: string
//     categoryId: number
//     images: string
// }


export interface IUpdateProduct {
    id: number
    updateInfo: Partial<ICreateProduct>
}