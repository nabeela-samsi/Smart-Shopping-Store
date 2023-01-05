import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { IUser } from "../../type/Reducers"

export const getAllUsers = createAsyncThunk(
    "getAllUsers",
   async () => {
        try {
            const getResponse = await axios("https://api.escuelajs.co/api/v1/users")
            const getData: IUser[] | Error = await getResponse.data
            return getData
        }catch(e: any) {
            console.log('something went wrong')
        }
    }
)