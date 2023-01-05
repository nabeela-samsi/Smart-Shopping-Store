import { PayloadAction } from "@reduxjs/toolkit";
import { IAddCartWishList, ICartWishlist, IRemoveCartWishList } from "../../type/Reducers";

export const addtoWishList = (
    state: ICartWishlist,
    action: PayloadAction<Error | IAddCartWishList>
) => {
    if('email' in action.payload) {
        const {email,productInfo} = action.payload
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

export const removeFromWishlist = (
    state: ICartWishlist,
    action: PayloadAction<Error | IRemoveCartWishList>
) => {
    if('productId' in action.payload) {
        const {email, productId} = action.payload
        const wishListInfo = {...state}
        const filteredData = wishListInfo[email].filter(product => product.id !== productId)
        return {
            ...state,
            [email]: [...filteredData]
        }
    }
    return state
}