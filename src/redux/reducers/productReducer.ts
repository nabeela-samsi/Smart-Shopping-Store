import { createSlice } from "@reduxjs/toolkit";

import { IProduct } from "../../type/Reducers";
import { getAllProducts } from "../methods/productMethods";

const initialState: IProduct[] = []

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                if (action.payload && "message" in action.payload) {
                    return state
                }
                return action.payload
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                console.log("something went wrong while loading products")
                return state
            })
    }
})

const productReducer = productSlice.reducer

// export const {filterByCategoryID} = productSlice.actions
export default productReducer