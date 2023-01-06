import { PayloadAction } from "@reduxjs/toolkit";
import { IAddCartWishList, ICartWishlist, IRemoveCartWishList } from "../../type/CartWishList";
import { IProduct } from "../../type/Product";

export const addtoCart = (
    state: ICartWishlist,
    action: PayloadAction<Error | IAddCartWishList>
) => {
    if('email' in action.payload) {
        const {email, productInfo, originalPrice} = action.payload
        const cartInfo = {...state}
        if(cartInfo[email]){
            const productExists = cartInfo[email].some(product => product.id === productInfo.id)
            let addProductInfo: IProduct[] = []
            if(productExists){
                addProductInfo = cartInfo[email].map((product: IProduct) => {
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
                    ...cartInfo[email],
                    {
                        ...productInfo,
                        quantity:1
                    }
                ]
            }
            return {
                ...state,
                [email]: [...addProductInfo]
            }
        } else {
            return {
                ...state,
                [email]: [{...productInfo, quantity:1}]
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
        const {email, productId, originalPrice} = action.payload
        const cartInfo = {...state}
        let cartValue: IProduct[] = []
        const checkDeleteType = cartInfo[email].some(product => {
            if(product.id === productId) {
                return (product.quantity === 1)
            }
        })
        if(checkDeleteType) {
            cartValue = cartInfo[email].filter(product => product.id !== productId)
        } else{
            cartValue = cartInfo[email].map(product => {
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
            [email]: [...cartValue]
        }
    }
    return state
}