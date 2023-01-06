import { createAsyncThunk } from "@reduxjs/toolkit"

import { IProduct } from "../../type/Product"
import axiosInstance from "../../common/axiosInstance"

export const getAllProducts = createAsyncThunk(
    "getAllProducts",
   async () => {
        try {
            const getResponse = await axiosInstance.get("/products")
            const getData: IProduct[] | Error = await getResponse.data
            return getData
        }catch(e: any) {
            console.log('something went wrong')
        }
    }
)