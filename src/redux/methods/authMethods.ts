import { createAsyncThunk } from "@reduxjs/toolkit";

import { IAuth, ICredentials, IReturnedCredentials, IUser } from "../../type/Auth";
import axiosInstance from "../../common/axiosInstance";
import { AxiosError } from "axios";
import { json } from "stream/consumers";
import { INewUser, IUpdateUser } from "../../type/Form";

export const userlogout = (state: IAuth) => {
    return {
        ...state,
        loggedIn: false,
        error: false,
        errorMsg: '',
        userInfo: null
    }
}

export const createNewUser = createAsyncThunk(
    "createNewUser",
    async (userData: INewUser) => {
        try{
            const createdUser = await axiosInstance.post("users/", userData)
            const data: IUser = createdUser.data
            return data
        } catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)

export const login = createAsyncThunk(
    "login",
    async (credentials: ICredentials) => {
        try{
            const auth = await axiosInstance.post('/auth/login', credentials)
            const authData: IReturnedCredentials = auth.data
            if("access_token" in authData && (authData.access_token.length)){
                const headerConfig = {
                    headers: {
                        "Authorization": `bearer ${authData.access_token}`
                    }
                }
                const response = await axiosInstance.get('/auth/profile', headerConfig)
                const responseData: IUser = response.data
                return responseData
            }
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
            const data: IUser = createdUser.data
            return data
        } catch(e) {
            const error = e as AxiosError
            return error
        }
    }
)