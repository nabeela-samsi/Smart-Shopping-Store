import { createSlice } from "@reduxjs/toolkit";

import { IAuth } from "../../type/Reducers";
import { checkEmailExists, getUserSessionInfo, login, userlogout } from "../methods/authMethods";
import { useAppDispatch } from "../../hooks/reduxHook";


const initialState: IAuth = {
    loading: true,
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
                if (action.payload) {
                    return {
                        loading: false,
                        loggedIn: true,
                        error: false,
                        errorMsg: '',
                        userInfo: action.payload
                    }
                }
                return state
            })
            .addCase(login.rejected, (state, action) => {
                let errorMsg = "Something went wrong please try again"
                if (action.error.code === 'ERR_BAD_REQUEST') {
                    errorMsg = "Email or Password are incorrect"
                }
                return {
                    loading: false,
                    loggedIn: false,
                    error: true,
                    errorMsg,
                    userInfo: null
                }
            })
    },
})

const authReducer = authSlice.reducer

export const { userLogout } = authSlice.actions
export default authReducer