import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

import { Product } from "../../type/Product";

const initialState: Product[] = []

export const getAllProducts = createAsyncThunk(
    "getAllProducts",
   async () => {
        try {
            const getResponse = await axios("https://api.escuelajs.co/api/v1/products")
            const getData: Product[] | Error = await getResponse.data
            return getData
        }catch(e: any) {
            console.log('something went wrong')
        }
    }
)

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state, action ) => {
            console.log("data is loading")
            return state
        } )
        builder.addCase(getAllProducts.rejected, (state,action) => {
            console.log("Something went wrong while loading the data")
            return state
        })
        builder.addCase(getAllProducts.fulfilled, (state,action) => {
            if(action.payload && "message" in action.payload) {
                return state
            } else if(!action.payload) {
                return state
            }
        })
    }
})

const productReducer = productSlice.reducer

export default productReducer