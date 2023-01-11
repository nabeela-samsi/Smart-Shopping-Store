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
            .addCase(login.fulfilled, (state, action) => {
                if(action.payload && "message" in action.payload) {
                    state.error = true
                    state.errorMsg = action.payload.message
                    state.loggedIn = false
                    state.userInfo = null
                    return state
                }
                if( action.payload && "id" in action.payload) {
                    const {id, email, password, name, role, avatar} = action.payload
                    const userData = {
                        id,
                        email,
                        password,
                        name,
                        role,
                        avatar
                    }
                    state.error=false
                    state.errorMsg=''
                    state.loggedIn=true
                    state.userInfo=userData
                    return state
                } else {
                    return state
                }
            })
    },
})

const authReducer = authSlice.reducer

export const { userLogout } = authSlice.actions
export default authReducer