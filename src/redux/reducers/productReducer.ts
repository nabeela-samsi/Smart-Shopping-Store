import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
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
        filterByCategoryID: (state: Product[], action: PayloadAction<number>) => {
            console.log("action", action)
            if(action.payload > 0) {
                return [...state].filter(item => item.category.id === action.payload)
            }
            return state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            if(action.payload && "message" in action.payload){
                console.log("state1")
                return state
            }
           return action.payload
        })
        builder.addCase(getAllProducts.pending, (state,action) => {
            console.log("category data is loading")
            return state
        })
        builder.addCase(getAllProducts.rejected, (state,action) => {
            console.log("something went wrong while loading categories")
            return state
        })
    }
})

const productReducer = productSlice.reducer

export const {filterByCategoryID} = productSlice.actions
export default productReducer