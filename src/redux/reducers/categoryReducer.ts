import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Category } from "../../type/Category";

export const getAllCategories = createAsyncThunk(
    "getAllCategories",
    async () => {
        try{
            const getResponse = await axios.get('https://api.escuelajs.co/api/v1/categories')
            const data: Category[] | Error = await getResponse.data
            return data
        }catch(e: any) {
            console.log("Something went wrong")
        }
    }
)

const initialState: Category[] = []

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.pending, (state,action) => {
            console.log("category data is loading")
            return state
        })
        builder.addCase(getAllCategories.rejected, (state,action) => {
            console.log("something went wrong while loading categories")
            return state
        })
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            if(action.payload && "message" in action.payload){
                return state
            } else if(!action.payload){
                return state
            }
        })
    }
})

const categoryReducer = categorySlice.reducer

export default categoryReducer



