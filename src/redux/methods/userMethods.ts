import { createAsyncThunk } from "@reduxjs/toolkit"

import axiosInstance from "../../common/axiosInstance"
import { IUser } from "../../type/Auth"

export const getAllUsers = createAsyncThunk(
    "getAllUsers",
   async () => {
        try {
            const getResponse = await axiosInstance.get("/users")
            const getData: IUser[] | Error = await getResponse.data
            return getData
        }catch(e: any) {
            console.log('something went wrong')
        }
    }
)