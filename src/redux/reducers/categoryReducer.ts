import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Category } from "../../type/Category";

const initialState: Category[] = []

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

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            if(action.payload && "message" in action.payload){
                console.log("state1")
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



