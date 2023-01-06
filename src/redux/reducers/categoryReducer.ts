import { createSlice } from "@reduxjs/toolkit";

import { ICategory } from "../../type/Category";
import { getAllCategories } from "../methods/categoryMethods";

const initialState: ICategory[] = []

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.fulfilled, (state, action) => {
                if (action.payload && "message" in action.payload) {
                    return state
                }
                return action.payload
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                console.log("something went wrong while loading categories")
                return state
            })
    }
})

const categoryReducer = categorySlice.reducer

export default categoryReducer



