import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

import { User } from "../../type/User";

const initialState: User[] = []

export const getAllUsers = createAsyncThunk(
    "getAllUsers",
   async () => {
        try {
            const getResponse = await axios("https://api.escuelajs.co/api/v1/users")
            const getData: User[] | Error = await getResponse.data
            return getData
        }catch(e: any) {
            console.log('something went wrong')
        }
    }
)

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