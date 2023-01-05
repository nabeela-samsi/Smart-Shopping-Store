import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IAuth, IUser } from "../../type/Reducers";
import axios from "axios";

const authUrl = 'https://api.escuelajs.co/api/v1'

export const userlogout = (state: IAuth) => {
    return {
        ...state,
        loggedIn: false,
        acessToken: ''
    }
}

export const login = createAsyncThunk(
    "login",
    async (credentials: {email: string, password: string}, thunkApi) => {
        const auth = await axios.post(`${authUrl}/auth/login`, credentials)
        const authData = await auth.data
        const result = await thunkApi.dispatch(getUserSessionInfo(authData.access_token))
        return result.payload as IUser
    }
)

export const getUserSessionInfo = createAsyncThunk(
    "getUserSessionInfo",
    async (accessToken: string) => {
        console.log(accessToken)
        const headerConfig = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
        const result = await axios.get(`${authUrl}/auth/profile`, headerConfig)
        return result.data
    }
)

export const checkEmailExists = createAsyncThunk(
    "checkEmailExists",
    async (email: string) => {
        const result = await axios.post(`${authUrl}/users/is-available`, email)
        return result
    }
)
