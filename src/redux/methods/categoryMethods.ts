import { createAsyncThunk } from "@reduxjs/toolkit"

import { ICategory, ICreateCategory } from "../../type/Category"
import axiosInstance from "../../common/axiosInstance"
import { AxiosError } from "axios"

export const getAllCategories = createAsyncThunk(
    "getAllCategories",
    async () => {
        try{
            const getResponse = await axiosInstance.get('/categories')
            const data = await getResponse.data
            return data
        }catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)

export const createNewCategory = createAsyncThunk(
    "createNewCategory",
    async (categoryData: ICreateCategory) => {
        try {
            const createCategory = await axiosInstance.post("/categories/", categoryData)
            return createCategory.data
        } catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)

export const updateCategory = createAsyncThunk(
    "updateCategory",
    async (categoryData: ICategory) => {
        try {
            const categoryId = categoryData.id
            //deletes id key from categoryData
            const {id, ...filterOutCategory} = categoryData
            const createCategory = await axiosInstance.put(`/categories/${categoryId}`, filterOutCategory)
            return createCategory.data
        } catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)

export const deletecategory = createAsyncThunk(
    "deletecategory",
    async (categoryId: number) => {
        try {
            const createCategory = await axiosInstance.delete(`/categories/${categoryId}`)
            const result = createCategory.data ? categoryId : 0
            return result
        } catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)