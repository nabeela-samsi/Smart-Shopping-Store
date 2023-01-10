import { createSlice } from "@reduxjs/toolkit";
import { ISwitchTheme } from "../../type/Theme";


const initialState: ISwitchTheme = {isModeDark: false}

export const themeSlice = createSlice({
    name: 'wishListSlice',
    initialState: initialState,
    reducers:{
        switchTheme: (state) => {
            state.isModeDark = ! state.isModeDark
        }
    }
})

const themeReducer = themeSlice.reducer

export const {switchTheme} = themeSlice.actions
export default themeReducer