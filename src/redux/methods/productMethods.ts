import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"

import { ICreateProduct, IProduct, IUpdateProduct} from "../../type/Product"
import axiosInstance from "../../common/axiosInstance"
import { AxiosError } from "axios"

export const getAllProducts = createAsyncThunk(
    "getAllProducts",
   async () => {
        try {
            const getResponse = await axiosInstance.get("/products")
            const getData = await getResponse.data
            return getData
        }catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)

export const createNewProduct = createAsyncThunk(
    "createNewProduct",
    async (productData: ICreateProduct) => {
        try {
            const createProduct = await axiosInstance.post("/products", productData)
            return createProduct.data
        } catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)

export const updateProduct = createAsyncThunk(
    "updateProduct",
    async (productData: IUpdateProduct) => {
        try {
            const {id, updateInfo} = productData
            const createProduct = await axiosInstance.put(`/products/${id}`, updateInfo)
            return createProduct.data
        } catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async (productId: number) => {
        try {
            const createProduct = await axiosInstance.delete(`/products/${productId}`)
            const result = createProduct.data ? productId : 0
            return result
        } catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)

export const productsort = (
    state:IProduct[],
    action:PayloadAction<{type: string}>
) => {
    switch (action.payload.type) {
        case 'LOW_TO_HIGH_PRICE':
            return [...state].sort((a,b) => (a.price > b.price ? 1: -1))
        case 'HIGH_TO_LOW_PRICE':
            return [...state].sort((a,b) => (a.price > b.price ? -1: 1))
        case 'A-Z':
            return [...state].sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1: -1))
        case 'Z-A':
            return [...state].sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase() ? -1: 1))
        default:
            return state
    }
}