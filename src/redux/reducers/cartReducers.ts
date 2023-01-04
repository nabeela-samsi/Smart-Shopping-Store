import { createSlice } from "@reduxjs/toolkit";

import { addtoCart, removeFromcart } from "../methods/cartMethods";
import { CartWishlist } from "../../type/Reducers";

const initialState: CartWishlist = {}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initialState,
    reducers:{
        addToCart: addtoCart,
        removeFromCart: removeFromcart
    }
})

const cartReducer = cartSlice.reducer

export const {addToCart, removeFromCart} = cartSlice.actions
export default cartReducer