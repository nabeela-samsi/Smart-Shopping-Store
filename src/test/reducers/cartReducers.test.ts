import { AnyAction, EmptyObject } from "@reduxjs/toolkit"
import type { } from 'redux-thunk/extend-redux';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"
import { createStore } from "../../redux/store"
import server from "../shared/server"
import { PersistPartial } from "redux-persist/es/persistReducer"
import { addToCart, removeFromCart } from "../../redux/reducers/cartReducers";
import testData from "../../utilities/testData";
import { IProduct } from "../../type/Product";
import { ICategory } from "../../type/Category";
import { IAuth } from "../../type/Auth";
import { ICartWishlist } from "../../type/CartWishList";
import { IUser } from "../../type/User";
import { ISwitchTheme } from "../../type/Theme";

let store: ToolkitStore<EmptyObject & {
    products: IProduct[];
    categories: ICategory[];
    auth: IAuth;
    cart: ICartWishlist;
    wishList: ICartWishlist;
    users: IUser[];
    theme: ISwitchTheme;
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
                userId: userInfo.id,
                productInfo,
                originalPrice: productInfo.price
            }
        ))
        const result = { [userInfo.id]: [{ ...productInfo, quantity: 1 }] }
        expect(store.getState().cart[userInfo.id]).toStrictEqual(result[userInfo.id])
        expect(Object.keys(store.getState().cart).length).toBe(1)
    })
    test("should add the same product in cart such that qunatity is incremented", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        const originalPrice = productInfo.price
        store.dispatch(addToCart(
            {
                userId: userInfo.id,
                productInfo,
                originalPrice: productInfo.price
            }
        ))
        const firstResult = { [userInfo.id]: [{ ...productInfo, quantity: 1 }] }
        expect(store.getState().cart[userInfo.id]).toStrictEqual(firstResult[userInfo.id])
        expect(Object.keys(store.getState().cart).length).toBe(1)
        store.dispatch(addToCart(
            {
                userId: userInfo.id,
                productInfo,
                originalPrice
            }
        ))
        const secondResult = { [userInfo.id]: [{ ...productInfo, quantity: 2, price: (productInfo.price + originalPrice) }] }
        expect(store.getState().cart[userInfo.id]).toStrictEqual(secondResult[userInfo.id])
        expect(Object.keys(store.getState().cart).length).toBe(1)
    })
    test("should add different products in cart", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        store.dispatch(addToCart(
            {
                userId: userInfo.id,
                productInfo: productInfo,
                originalPrice: productInfo.price
            }
        ))
        let result = { [userInfo.id]: [{ ...productInfo, quantity: 1 }] }
        expect(store.getState().cart[userInfo.id]).toStrictEqual(result[userInfo.id])
        expect(Object.keys(store.getState().cart).length).toBe(1)
        const productInfo2 = testData.allProducts[1]
        store.dispatch(addToCart(
            {
                userId: userInfo.id,
                productInfo: productInfo2,
                originalPrice: productInfo2.price
            }
        ))
        const newProdctInfo = [{ ...productInfo, quantity: 1 }, { ...productInfo2, quantity: 1 }]
        const finalResult = {
            ...result,
            [userInfo.id]: [...newProdctInfo]
        }
        expect(store.getState().cart[userInfo.id]).toStrictEqual(finalResult[userInfo.id])
        expect(Object.keys(store.getState().cart).length).toBe(1)
    })
    test("should remove product from cart such that product quantity is 1", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        store.dispatch(addToCart(
            {
                userId: userInfo.id,
                productInfo,
                originalPrice: productInfo.price
            }
        ))
        const result = { [userInfo.id]: [{ ...productInfo, quantity: 1 }] }
        expect(store.getState().cart[userInfo.id]).toStrictEqual(result[userInfo.id])
        expect(Object.keys(store.getState().cart).length).toBe(1)
        store.dispatch(removeFromCart({
            userId: userInfo.id,
            productId: productInfo.id,
            originalPrice: productInfo.price
        }))
        expect(Object.keys(store.getState().cart[userInfo.id]).length).toBe(0)
    })
    test("should remove product from cart such that product quantity is 2", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        const originalPrice = productInfo.price
        store.dispatch(addToCart(
            {
                userId: userInfo.id,
                productInfo,
                originalPrice
            }
        ))
        const result = { [userInfo.id]: [{ ...productInfo, quantity: 1 }] }
        expect(store.getState().cart[userInfo.id]).toStrictEqual(result[userInfo.id])
        expect(Object.keys(store.getState().cart).length).toBe(1)
        store.dispatch(addToCart(
            {
                userId: userInfo.id,
                productInfo,
                originalPrice
            }
        ))
        const newPrice = productInfo.price + originalPrice
        const secondResult = {
            [userInfo.id]: [
                {
                    ...productInfo,
                    quantity: 2,
                    price: newPrice
                }
            ]
        }
        expect(store.getState().cart[userInfo.id]).toStrictEqual(secondResult[userInfo.id])
        expect(Object.keys(store.getState().cart).length).toBe(1)
        store.dispatch(removeFromCart({
            userId: userInfo.id,
            productId: productInfo.id,
            originalPrice
        }))
        const finalResult = {
            [userInfo.id]: [
                {
                    ...productInfo,
                    quantity: 1,
                    price: (newPrice - originalPrice)
                }
            ]
        }
        expect(store.getState().cart[userInfo.id]).toStrictEqual(finalResult[userInfo.id])
        expect(Object.keys(store.getState().cart[userInfo.id]).length).toBe(1)
    })
})

export { }