import { createSlice } from "@reduxjs/toolkit";
import { addtoCart, removeFromcart } from "../methods/cartMethods";
import { ICartWishlist } from "../../type/CartWishList";

const initialState: ICartWishlist = {}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initialState,
    reducers: {
        addToCart: addtoCart,
        removeFromCart: removeFromcart
    }
})

const cartReducer = cartSlice.reducer

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartReducer