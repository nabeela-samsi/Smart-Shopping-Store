import { PayloadAction } from "@reduxjs/toolkit";
import { AddCartWishList, CartWishlist, RemoveCartWishList } from "../../type/Reducers";

export const addtoCart = (
    state: CartWishlist,
    action: PayloadAction<Error | AddCartWishList>
) => {
    if('email' in action.payload) {
        const {email, productInfo} = action.payload
        if(state[email]){
            return {
                ...state,
                [email]: [...state[email], productInfo]
            }
        } else {
            return {
                ...state,
                [email]: [productInfo]
            }
        }
    }
    return state
}

export const removeFromcart = (
    state: CartWishlist,
    action: PayloadAction<Error | RemoveCartWishList>
) => {
    if('productId' in action.payload) {
        const {email, productId} = action.payload
        const cartValue = state[email]
        const productIndex = cartValue.findIndex(product => product.id === productId)
        if(productIndex >= 0 ){
            cartValue.splice(productIndex,1);
        }
        return {
            ...state,
            [email]: [...state[email], ...cartValue]
        }
    }
    return state
}