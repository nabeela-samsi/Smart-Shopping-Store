import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { IProduct } from "../../type/Reducers"

export const getAllProducts = createAsyncThunk(
    "getAllProducts",
   async () => {
        try {
            const getResponse = await axios("https://api.escuelajs.co/api/v1/products")
            const getData: IProduct[] | Error = await getResponse.data
            return getData
        }catch(e: any) {
            console.log('something went wrong')
        }
    }
)