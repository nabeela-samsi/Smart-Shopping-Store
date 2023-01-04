import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Category } from "../../type/Reducers"

export const getAllCategories = createAsyncThunk(
    "getAllCategories",
    async () => {
        try{
            const getResponse = await axios('https://api.escuelajs.co/api/v1/categories')
            const data: Category[] | Error = await getResponse.data
            return data
        }catch(e: any) {
            throw new Error(e.message)
        }
    }
)