import { createSlice } from "@reduxjs/toolkit";

import { CartWishlist } from "../../type/Reducers";
import { addtoWishList, removeFromWishlist } from "../methods/wishListMethods";

const initialState: CartWishlist = {}

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