import { createSlice } from "@reduxjs/toolkit";

import { Auth } from "../../type/Reducers";
import { userlogin, userlogout } from "../methods/authMethods";


const initialState: Auth = {
    loggedIn: false,
    userInfo: null
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers:{
        userLogin: userlogin,
        userLogout: userlogout
    }
})

const authReducer = authSlice.reducer

export const {userLogin, userLogout} = authSlice.actions
export default authReducer