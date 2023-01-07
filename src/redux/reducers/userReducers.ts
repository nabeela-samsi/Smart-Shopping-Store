import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../type/Auth";
import { getAllUsers } from "../methods/userMethods";

const initialState: IUser[] = []

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                if (action.payload && "message" in action.payload) {
                    return state
                }
                return action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                console.log("something went wrong while loading products")
                return state
            })
    }
})

const userReducer = userSlice.reducer

export default userReducer