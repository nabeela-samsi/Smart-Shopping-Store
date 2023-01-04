import { createSlice } from "@reduxjs/toolkit";

import { User } from "../../type/Reducers";
import { getAllUsers } from "../methods/userMethods";

const initialState: User[] = []

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            if(action.payload && "message" in action.payload){
                return state
            }
           return action.payload
        })
        builder.addCase(getAllUsers.pending, (state,action) => {
            console.log("category data is loading")
            return state
        })
        builder.addCase(getAllUsers.rejected, (state,action) => {
            console.log("something went wrong while loading categories")
            return state
        })
    }
})

const userReducer = userSlice.reducer

// export const {filterByCategoryID} = userSlice.actions
export default userReducer