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