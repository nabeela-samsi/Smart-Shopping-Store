import { PayloadAction } from "@reduxjs/toolkit";
import { IAddCartWishList, ICartWishlist, IRemoveCartWishList } from "../../type/CartWishList";
import { IProduct } from "../../type/Product";

export const addtoCart = (
    state: ICartWishlist,
    action: PayloadAction<Error | IAddCartWishList>
) => {
    if('userId' in action.payload) {
        const {userId, productInfo, originalPrice} = action.payload
        const cartInfo = {...state}
        if(cartInfo[userId]){
            const productExists = cartInfo[userId].some(product => product.id === productInfo.id)
            let addProductInfo: IProduct[] = []
            if(productExists){
                addProductInfo = cartInfo[userId].map((product: IProduct) => {
                    if(product.id === productInfo.id) {
                        const quantity = (product.quantity) ? product.quantity : 1
                        return {
                            ...product,
                            quantity: quantity + 1,
                            price: product.price + Number(originalPrice)
                        }
                    }
                    return {...product}
                })
            } else {
                addProductInfo = [
                    ...cartInfo[userId],
                    {
                        ...productInfo,
                        quantity:1
                    }
                ]
            }
            return {
                ...state,
                [userId]: [...addProductInfo]
            }
        } else {
            return {
                ...state,
                [userId]: [{...productInfo, quantity:1}]
            }
        }
    }
    return state
}

export const removeFromcart = (
    state: ICartWishlist,
    action: PayloadAction<Error | IRemoveCartWishList>
) => {
    if('productId' in action.payload) {
        const {userId, productId, originalPrice} = action.payload
        const duplicateState = {...state}
        const cartInfoArray = duplicateState[userId]
        let cartValue: IProduct[] = []
        let checkDeleteType
        for(let item in cartInfoArray ) {
            if(cartInfoArray[item].id === productId) {
                checkDeleteType = (cartInfoArray[item].quantity === 1)
            }
        }
        if(checkDeleteType) {
            cartValue = cartInfoArray.filter(product => product.id !== productId)
        } else{
            cartValue = cartInfoArray.map(product => {
                if(product.id === productId){
                    const quantity = (product.quantity) ? product.quantity : 2
                    return {
                        ...product,
                        quantity: quantity - 1,
                        price: product.price - Number(originalPrice)
                    }
                }
                return {...product}
            })
        }
        return {
            ...state,
            [userId]: [...cartValue]
        }
    }
    return state
}