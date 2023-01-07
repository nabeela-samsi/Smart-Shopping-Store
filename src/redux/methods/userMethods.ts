import { createAsyncThunk } from "@reduxjs/toolkit"

import axiosInstance from "../../common/axiosInstance"
import { AxiosError } from "axios"
import { INewUser, IUpdateUser } from "../../type/User"

export const getAllUsers = createAsyncThunk(
    "getAllUsers",
   async () => {
        try {
            const getResponse = await axiosInstance.get("/users")
            const getData = await getResponse.data
            return getData
        }catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)

export const createNewUser = createAsyncThunk(
    "createNewUser",
    async (userData: INewUser) => {
        try{
            const createdUser = await axiosInstance.post("users/", userData)
            const data = createdUser.data
            return data
        } catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)
export const updateUser = createAsyncThunk(
    "updateUser",
    async (info: IUpdateUser) => {
        try{
            const createdUser = await axiosInstance.put(`users/${info.id}`, info.updateInfo)
            const data = createdUser.data
            return data
        } catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)