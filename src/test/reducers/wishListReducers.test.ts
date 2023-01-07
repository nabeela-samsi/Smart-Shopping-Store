import { AnyAction, EmptyObject} from "@reduxjs/toolkit"
import type {} from 'redux-thunk/extend-redux';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"

import { createStore } from "../../redux/store"
import server from "../shared/server"
import { PersistPartial } from "redux-persist/es/persistReducer"
import testData from "../../utilities/testData";
import { addToWishList, removeFromWishList } from "../../redux/reducers/wishListReducers";
import { IProduct } from "../../type/Product";
import { ICategory } from "../../type/Category";
import { IAuth, IUser } from "../../type/Auth";
import { ICartWishlist } from "../../type/CartWishList";

let store: ToolkitStore<EmptyObject & {
    products: IProduct[]
    categories: ICategory[];
    auth: IAuth;
    cart: ICartWishlist;
    wishList: ICartWishlist;
    users: IUser[];
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
        expect(Object.keys(store.getState().wishList).length).toBe(0)
    })

    test("should add the product in wishlist", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        store.dispatch(addToWishList(
            {
                email: userInfo.email,
                productInfo
            }
        ))
        const result = { [userInfo.email]: [{ ...productInfo }] }
        expect(store.getState().wishList[userInfo.email]).toStrictEqual(result[userInfo.email])
        expect(Object.keys(store.getState().wishList).length).toBe(1)
    })

    test("should not add duplicate product in wishlist", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        store.dispatch(addToWishList(
            {
                email: userInfo.email,
                productInfo
            }
        ))
        const result = { [userInfo.email]: [{ ...productInfo }] }
        expect(store.getState().wishList[userInfo.email]).toStrictEqual(result[userInfo.email])
        expect(Object.keys(store.getState().wishList).length).toBe(1)

        store.dispatch(addToWishList(
            {
                email: userInfo.email,
                productInfo
            }
        ))
        expect(store.getState().wishList[userInfo.email]).toStrictEqual(result[userInfo.email])
        expect(Object.keys(store.getState().wishList).length).toBe(1)
    })

    test("should add 2 products in wishlist", () => {
        const userInfo = testData.allUsers[0]
        const productInfo1 = testData.allProducts[0]
        const productInfo2 = testData.allProducts[1]
        store.dispatch(addToWishList(
            {
                email: userInfo.email,
                productInfo: productInfo1
            }
        ))
        const result = { [userInfo.email]: [{ ...productInfo1 }] }
        expect(store.getState().wishList[userInfo.email]).toStrictEqual(result[userInfo.email])
        expect(Object.keys(store.getState().wishList).length).toBe(1)

        store.dispatch(addToWishList(
            {
                email: userInfo.email,
                productInfo: productInfo2
            }
        ))
        const secondResult = { [userInfo.email]: [{ ...productInfo1 }, {...productInfo2}] }
        expect(store.getState().wishList[userInfo.email]).toStrictEqual(secondResult[userInfo.email])
        expect(Object.keys(store.getState().wishList).length).toBe(1)
    })

    test("should remove the product from wishlist", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        store.dispatch(addToWishList(
            {
                email: userInfo.email,
                productInfo
            }
        ))
        const result = { [userInfo.email]: [{ ...productInfo }] }
        expect(store.getState().wishList[userInfo.email]).toStrictEqual(result[userInfo.email])
        expect(Object.keys(store.getState().wishList).length).toBe(1)

        store.dispatch(removeFromWishList(
            {
                email: userInfo.email,
                productId: productInfo.id
            }
        ))
        expect(Object.keys(store.getState().wishList[userInfo.email]).length).toBe(0)
    })
})

export {}