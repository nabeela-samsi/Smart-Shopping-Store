import type {} from 'redux-thunk/extend-redux';
import { createStore } from "../../redux/store"
import testData from "../../utilities/testData";
import { addToWishList, removeFromWishList } from "../../redux/reducers/wishListReducers";
import { TStore } from "../../type/Store";

let store: TStore

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
                userId: userInfo.id,
                productInfo
            }
        ))
        const result = { [userInfo.id]: [{ ...productInfo }] }
        expect(store.getState().wishList[userInfo.id]).toStrictEqual(result[userInfo.id])
        expect(Object.keys(store.getState().wishList).length).toBe(1)
    })
    test("should not add duplicate product in wishlist", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        store.dispatch(addToWishList(
            {
                userId: userInfo.id,
                productInfo
            }
        ))
        const result = { [userInfo.id]: [{ ...productInfo }] }
        expect(store.getState().wishList[userInfo.id]).toStrictEqual(result[userInfo.id])
        expect(Object.keys(store.getState().wishList).length).toBe(1)

        store.dispatch(addToWishList(
            {
                userId: userInfo.id,
                productInfo
            }
        ))
        expect(store.getState().wishList[userInfo.id]).toStrictEqual(result[userInfo.id])
        expect(Object.keys(store.getState().wishList).length).toBe(1)
    })
    test("should add 2 products in wishlist", () => {
        const userInfo = testData.allUsers[0]
        const productInfo1 = testData.allProducts[0]
        const productInfo2 = testData.allProducts[1]
        store.dispatch(addToWishList(
            {
                userId: userInfo.id,
                productInfo: productInfo1
            }
        ))
        const result = { [userInfo.id]: [{ ...productInfo1 }] }
        expect(store.getState().wishList[userInfo.id]).toStrictEqual(result[userInfo.id])
        expect(Object.keys(store.getState().wishList).length).toBe(1)

        store.dispatch(addToWishList(
            {
                userId: userInfo.id,
                productInfo: productInfo2
            }
        ))
        const secondResult = { [userInfo.id]: [{ ...productInfo1 }, {...productInfo2}] }
        expect(store.getState().wishList[userInfo.id]).toStrictEqual(secondResult[userInfo.id])
        expect(Object.keys(store.getState().wishList).length).toBe(1)
    })
    test("should remove the product from wishlist", () => {
        const userInfo = testData.allUsers[0]
        const productInfo = testData.allProducts[0]
        store.dispatch(addToWishList(
            {
                userId: userInfo.id,
                productInfo
            }
        ))
        const result = { [userInfo.id]: [{ ...productInfo }] }
        expect(store.getState().wishList[userInfo.id]).toStrictEqual(result[userInfo.id])
        expect(Object.keys(store.getState().wishList).length).toBe(1)

        store.dispatch(removeFromWishList(
            {
                userId: userInfo.id,
                productId: productInfo.id
            }
        ))
        expect(Object.keys(store.getState().wishList[userInfo.id]).length).toBe(0)
    })
})

export {}