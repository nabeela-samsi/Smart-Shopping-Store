import { createAsyncThunk } from "@reduxjs/toolkit";

import { IAuth, ICredentials, IReturnedCredentials} from "../../type/Auth";
import axiosInstance from "../../common/axiosInstance";
import { AxiosError } from "axios";
import { IUser } from "../../type/User";

export const userlogout = (state: IAuth) => {
    return {
        ...state,
        error: false,
        errorMsg: '',
        userInfo: null,
        loggedIn: false
    }
}

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
                const responseData: IUser = await response.data
                return responseData
            }
        } catch(e) {
            const error = e as AxiosError
            let errorMsg = "Something went wrong please try again"
            if(error.response?.status === 401) {
                errorMsg = "Email or Password are incorrect"
            }
            return {...error, message: errorMsg}
        }
    }
)