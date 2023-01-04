import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "../../type/Reducers";
import axios from "axios";

export const userlogin = (
    state: Auth,
    action: PayloadAction<Error | Auth>
) => {
    if('loggedIn' in action.payload) {
        return {
            ...state,
            loggedIn: action.payload.loggedIn,
            userInfo: action.payload.userInfo
        }
    }
    return state
}

export const userlogout = (state: Auth) => {
    return {
        ...state,
        loggedIn: false,
        userInfo: null
    }
}

export const getAllCategories = createAsyncThunk(
    "getAllCategories",
    async () => {
        try{
            const getResponse = await axios('https://api.escuelajs.co/api/v1/categories')
            const data: [] | Error = await getResponse.data
            return data
        }catch(e: any) {
            throw new Error(e.message)
        }
    }
)