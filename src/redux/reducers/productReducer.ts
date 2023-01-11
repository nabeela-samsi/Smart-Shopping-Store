import { createSlice } from "@reduxjs/toolkit";

import { createNewProduct, deleteProduct, getAllProducts, productsort, updateProduct } from "../methods/productMethods";
import { IProduct } from "../../type/Product";
import { AxiosError } from "axios";

const initialState: IProduct[] = []

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        sortProduct: productsort
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                if(action.payload instanceof AxiosError) {
                    return state
                } else{
                    return action.payload
                }
            })
            .addCase(createNewProduct.fulfilled, (state, action) => {
                if(action.payload instanceof AxiosError) {
                    return state
                } else {
                    return [...state, action.payload]
                }
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                if(action.payload instanceof AxiosError) {
                    return state
                } else {
                    const modifyState = [...state]
                    const result = modifyState.map(product => product.id === action.payload.id ? action.payload : product)
                    return result
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                if(action.payload instanceof AxiosError) {
                    return state
                }
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
export const {sortProduct} = productSlice.actions
export default productReducer