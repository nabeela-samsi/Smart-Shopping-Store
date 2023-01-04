import { createSlice } from "@reduxjs/toolkit";

import { Product } from "../../type/Reducers";
import { getAllProducts } from "../methods/productMethods";

const initialState: Product[] = []

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            if(action.payload && "message" in action.payload){
                return state
            }
           return action.payload
        })
        builder.addCase(getAllProducts.pending, (state,action) => {
            console.log("product data is loading")
            return state
        })
        builder.addCase(getAllProducts.rejected, (state,action) => {
            console.log("something went wrong while loading products")
            return state
        })
    }
})

const productReducer = productSlice.reducer

// export const {filterByCategoryID} = productSlice.actions
export default productReducer