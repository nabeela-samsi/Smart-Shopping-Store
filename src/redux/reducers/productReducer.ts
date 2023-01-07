import { createSlice } from "@reduxjs/toolkit";

import { createNewProduct, deleteProduct, getAllProducts, updateProduct } from "../methods/productMethods";
import { IProduct } from "../../type/Product";

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
            .addCase(createNewProduct.fulfilled, (state, action) => {
                if(action.payload) {
                    return [...state, action.payload]
                } else {
                    return state
                }
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                if(action.payload) {
                    const modifyState = [...state]
                    const result = modifyState.map(product => product.id === action.payload.id ? action.payload : product)
                    return result
                } else {
                    return state
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                if(action.payload > 0) {
                    const modifyState = [...state]
                    const result = modifyState.filter(product => product.id !== action.payload)
                    return result
                } else {
                    return state
                }
            })
    }
})

const productReducer = productSlice.reducer

// export const {filterByCategoryID} = productSlice.actions
export default productReducer