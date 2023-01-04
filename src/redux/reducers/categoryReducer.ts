import { createSlice } from "@reduxjs/toolkit";

import { Category } from "../../type/Reducers";
import { getAllCategories } from "../methods/categoryMethods";

const initialState: Category[] = []

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            if(action.payload && "message" in action.payload){
                return state
            }
           return action.payload
        })
        builder.addCase(getAllCategories.pending, (state,action) => {
            console.log("category data is loading")
            return state
        })
        builder.addCase(getAllCategories.rejected, (state,action) => {
            console.log("something went wrong while loading categories")
            return state
        })
    }
})

const categoryReducer = categorySlice.reducer

export default categoryReducer



