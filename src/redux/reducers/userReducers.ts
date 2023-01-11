import { createSlice } from "@reduxjs/toolkit";
import { createNewUser, getAllUsers, updateUser } from "../methods/userMethods";
import { AxiosError } from "axios";
import { IUser } from "../../type/User";

const initialState: IUser[] = []

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    return state
                } else {
                    return action.payload
                }
            })
            .addCase(createNewUser.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    return state
                } else {
                    return [...state, action.payload]
                }
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    return state
                } else {
                    return state.map(user => user.id === action.payload.id ? action.payload : user)
                }
            })
    }
})

const userReducer = userSlice.reducer

export default userReducer