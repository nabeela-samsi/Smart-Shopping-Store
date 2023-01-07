import { createAsyncThunk } from "@reduxjs/toolkit"

import { ICreateProduct, IUpdateProduct} from "../../type/Product"
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