import { PayloadAction } from "@reduxjs/toolkit";
import { IAddCartWishList, ICartWishlist, IRemoveCartWishList } from "../../type/CartWishList";

export const addtoWishList = (
    state: ICartWishlist,
    action: PayloadAction<Error | IAddCartWishList>
) => {
    if('userId' in action.payload) {
        const {userId,productInfo} = action.payload
        const wishListInfo = {...state}
        if(wishListInfo[userId]) {
            const checkDataPresent = wishListInfo[userId].some(product => product.id === productInfo.id)
            if(!checkDataPresent){
                return {
                    ...state,
                    [userId]: [...state[userId], productInfo]
                }
            }
        } else {
            return {
                ...state,
                [userId]: [productInfo]
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
        const {userId, productId} = action.payload
        const wishListInfo = {...state}
        const filteredData = wishListInfo[userId].filter(product => product.id !== productId)
        return {
            ...state,
            [userId]: [...filteredData]
        }
    }
    return state
}