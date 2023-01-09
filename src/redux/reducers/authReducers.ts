import { createSlice } from "@reduxjs/toolkit";

import { login, userlogout } from "../methods/authMethods";
import { IAuth, } from "../../type/Auth";
import { AxiosError } from "axios";

const initialState: IAuth = {
    loggedIn: false,
    userInfo: null,
    error: false,
    errorMsg: ''
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        userLogout: userlogout
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state = initialState, action) => {
                console.log("hey here")
                if(action.payload instanceof AxiosError) {
                    let errorMsg = "Something went wrong please try again"
                    if(action.payload.response?.status === 401) {
                        errorMsg = "Email or Password are incorrect"
                    }
                    return {
                        ...state,
                        loggedIn: false,
                        error: true,
                        errorMsg: errorMsg,
                        userInfo: null
                    }
                } else {
                    if(action.payload) {
                        const {id, email, password, name, role, avatar} = action.payload
                        const userData = {
                            id,
                            email,
                            password,
                            name,
                            role,
                            avatar
                        }
                        return {
                            ...state,
                            loggedIn: true,
                            error: false,
                            userInfo: userData
                        }
                    }
                    return state
                }
            })
    },
})

const authReducer = authSlice.reducer

export const { userLogout } = authSlice.actions
export default authReducer