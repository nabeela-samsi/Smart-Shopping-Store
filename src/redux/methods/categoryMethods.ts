import { createAsyncThunk } from "@reduxjs/toolkit"

import { ICategory } from "../../type/Category"
import axiosInstance from "../../common/axiosInstance"

export const getAllCategories = createAsyncThunk(
    "getAllCategories",
    async () => {
        try{
            const getResponse = await axiosInstance.get('/categories')
            const data: ICategory[] | Error = await getResponse.data
            return data
        }catch(e: any) {
            throw new Error(e.message)
        }
    }
)