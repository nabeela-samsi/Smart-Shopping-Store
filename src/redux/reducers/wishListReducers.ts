import { createSlice } from "@reduxjs/toolkit";
import { addtoWishList, removeFromWishlist } from "../methods/wishListMethods";
import { ICartWishlist } from "../../type/CartWishList";

const initialState: ICartWishlist = {}

export const wishListSlice = createSlice({
    name: 'wishListSlice',
    initialState: initialState,
    reducers: {
        addToWishList: addtoWishList,
        removeFromWishList: removeFromWishlist
    }
})

const wishListReducer = wishListSlice.reducer

export const { addToWishList, removeFromWishList } = wishListSlice.actions
export default wishListReducer