import { createAsyncThunk } from "@reduxjs/toolkit";

import { IAuth, ICredentials, IReturnedCredentials, IUser } from "../../type/Auth";
import axiosInstance from "../../common/axiosInstance";
import { AxiosError } from "axios";
import { json } from "stream/consumers";

export const userlogout = (state: IAuth) => {
    return {
        ...state,
        loggedIn: false,
        error: false,
        errorMsg: '',
        userInfo: null
    }
}

// export const login = createAsyncThunk(
//     "login",
//     async (credentials: ICredentials, thunkApi) => {
//         try{
//             console.log(credentials)
//             const auth = await axiosInstance.post('/auth/login', credentials)
//             const authData: IReturnedCredentials = auth.data
//             if("access_token" in authData && (authData.access_token.length)){
//                 console.log("here i am with")
//                 const response = await thunkApi.dispatch(getUserSessionInfo(authData.access_token))
//                 return response.payload as IUser
//             }
//         } catch(e) {
//             const error = e as AxiosError
//             return error
//         }
//     }
// )

export const login = createAsyncThunk(
    "login",
    async (credentials: ICredentials, thunkApi) => {
        try{
            console.log(credentials)
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

// export const userSessionInfo = createAsyncThunk(
//     "userSessionInfo",
//     async (accessToken: string) => {
//         console.log(accessToken)
//         try{
//             const headerConfig = {
//                 headers: {
//                     "Authorization": `bearer ${accessToken}`
//                 }
//             }
//             const response = await axiosInstance.get('/auth/profile', headerConfig)
//             const data: IUser = response.data
//             return data
//         } catch(e) {
//             const error = e as AxiosError
//              console.log("error In login")
//             return error
//         }

//     }
// )

export const checkEmailExists = createAsyncThunk(
    "checkEmailExists",
    async (email: string) => {
        const result = await axiosInstance.post('/users/is-available', {email: email})
        console.log(result)
        return result.data
    }
)

export const createUser = createAsyncThunk(
    "createUser",
    async(userData: IUser) => {
        const result = await axiosInstance.post('/users', userData)
        return result
    }
)
