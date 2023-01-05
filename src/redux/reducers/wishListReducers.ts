import { createSlice } from "@reduxjs/toolkit";

import { ICartWishlist } from "../../type/Reducers";
import { addtoWishList, removeFromWishlist } from "../methods/wishListMethods";

const initialState: ICartWishlist = {}

export const wishListSlice = createSlice({
    name: 'wishListSlice',
    initialState: initialState,
    reducers:{
        addToWishList: addtoWishList,
        removeFromWishList: removeFromWishlist
    }
})

const wishListReducer = wishListSlice.reducer

export const {addToWishList, removeFromWishList} = wishListSlice.actions
export default wishListReducer