import { AnyAction, EmptyObject } from "@reduxjs/toolkit"
import type { } from 'redux-thunk/extend-redux';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"

import { createStore } from "../../redux/store"
import server from "../shared/server"
import { PersistPartial } from "redux-persist/es/persistReducer"
import { IAuth, ICartWishlist, ICategory, IProduct } from "../../type/Reducers";
import { addToCart, removeFromCart } from "../../redux/reducers/cartReducers";
import testData from "../../utilities/testData";
import { serialize } from "v8";
import { Email } from "@mui/icons-material";

let store: ToolkitStore<EmptyObject & {
    products: IProduct[];
    categories: ICategory[];
    auth: IAuth;
    cart: ICartWishlist;
    wishList: ICartWishlist;
} & PersistPartial, AnyAction>

beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})

beforeEach(() => {
    store = createStore()
})

describe("Test all the actions", () => {

    test("should return initial state", () => {
        expect(Object.keys(store.getState().cart).length).toBe(0)
    })

    test("should add the product in cart", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        store.dispatch(addToCart(
            {
                email: userInfo.email,
                productInfo,
                originalPrice: productInfo.price
            }
        ))
        const result = { [userInfo.email]: [{ ...productInfo, quantity: 1 }] }
        expect(store.getState().cart[userInfo.email]).toStrictEqual(result[userInfo.email])
        expect(Object.keys(store.getState().cart).length).toBe(1)
    })

    test("should add the same product in cart such that qunatity is incremented", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        const originalPrice = productInfo.price
        store.dispatch(addToCart(
            {
                email: userInfo.email,
                productInfo,
                originalPrice: productInfo.price
            }
        ))
        const firstResult = { [userInfo.email]: [{ ...productInfo, quantity: 1 }] }
        expect(store.getState().cart[userInfo.email]).toStrictEqual(firstResult[userInfo.email])
        expect(Object.keys(store.getState().cart).length).toBe(1)

        store.dispatch(addToCart(
            {
                email: userInfo.email,
                productInfo,
                originalPrice
            }
        ))
        const secondResult = { [userInfo.email]: [{ ...productInfo, quantity: 2, price: (productInfo.price + originalPrice) }] }
        expect(store.getState().cart[userInfo.email]).toStrictEqual(secondResult[userInfo.email])
        expect(Object.keys(store.getState().cart).length).toBe(1)
    })

    test("should add different products in cart", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        store.dispatch(addToCart(
            {
                email: userInfo.email,
                productInfo: productInfo,
                originalPrice: productInfo.price
            }
        ))
        let result = { [userInfo.email]: [{ ...productInfo, quantity: 1 }] }
        expect(store.getState().cart[userInfo.email]).toStrictEqual(result[userInfo.email])
        expect(Object.keys(store.getState().cart).length).toBe(1)

        const productInfo2 = testData.allProducts[1]
        store.dispatch(addToCart(
            {
                email: userInfo.email,
                productInfo: productInfo2,
                originalPrice: productInfo2.price
            }
        ))
        const newProdctInfo = [{ ...productInfo, quantity: 1 }, { ...productInfo2, quantity: 1 }]
        const finalResult = {
            ...result,
            [userInfo.email]: [...newProdctInfo]
        }
        expect(store.getState().cart[userInfo.email]).toStrictEqual(finalResult[userInfo.email])
        expect(Object.keys(store.getState().cart).length).toBe(1)
    })

    test("should remove product from cart such that product quantity is 1", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        store.dispatch(addToCart(
            {
                email: userInfo.email,
                productInfo,
                originalPrice: productInfo.price
            }
        ))
        const result = { [userInfo.email]: [{ ...productInfo, quantity: 1 }] }
        expect(store.getState().cart[userInfo.email]).toStrictEqual(result[userInfo.email])
        expect(Object.keys(store.getState().cart).length).toBe(1)

        store.dispatch(removeFromCart({
            email: userInfo.email,
            productId: productInfo.id,
            originalPrice: productInfo.price
        }))
        expect(Object.keys(store.getState().cart[userInfo.email]).length).toBe(0)
    })

    test("should remove product from cart such that product quantity is 2", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        const originalPrice = productInfo.price
        store.dispatch(addToCart(
            {
                email: userInfo.email,
                productInfo,
                originalPrice
            }
        ))
        const result = { [userInfo.email]: [{ ...productInfo, quantity: 1 }] }
        expect(store.getState().cart[userInfo.email]).toStrictEqual(result[userInfo.email])
        expect(Object.keys(store.getState().cart).length).toBe(1)

        store.dispatch(addToCart(
            {
                email: userInfo.email,
                productInfo,
                originalPrice
            }
        ))
        const newPrice = productInfo.price + originalPrice
        const secondResult = {
            [userInfo.email]: [
                {
                    ...productInfo,
                    quantity: 2,
                    price: newPrice
                }
            ]
        }
        expect(store.getState().cart[userInfo.email]).toStrictEqual(secondResult[userInfo.email])
        expect(Object.keys(store.getState().cart).length).toBe(1)

        store.dispatch(removeFromCart({
            email: userInfo.email,
            productId: productInfo.id,
            originalPrice
        }))
        const finalResult = {
            [userInfo.email]: [
                {
                    ...productInfo,
                    quantity: 1,
                    price: (newPrice - originalPrice)
                }
            ]
        }
        expect(store.getState().cart[userInfo.email]).toStrictEqual(finalResult[userInfo.email])
        expect(Object.keys(store.getState().cart[userInfo.email]).length).toBe(1)
    })
})

export { }