import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../../type/Category";
import { createNewCategory, deletecategory, getAllCategories, updateCategory } from "../methods/categoryMethods";
import { AxiosError } from "axios";

const initialState: ICategory[] = []

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    return state
                } else {
                    return action.payload
                }
            })
            .addCase(createNewCategory.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    return state
                } else {
                    return [...state, action.payload]
                }
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    return state
                } else {
                    return state.map(category => category.id === action.payload.id ? action.payload : category)
                }
            })
            .addCase(deletecategory.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    return state
                }
                if (action.payload > 0) {
                    return state.filter(category => category.id !== action.payload)
                } else {
                    return state
                }
            })
    }
})

const categoryReducer = categorySlice.reducer

export default categoryReducer



