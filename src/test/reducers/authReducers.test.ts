import { AnyAction, EmptyObject } from "@reduxjs/toolkit"
import type { } from 'redux-thunk/extend-redux';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"

import { createStore } from "../../redux/store"
import server from "../shared/server"
import { PersistPartial } from "redux-persist/es/persistReducer"

import { IProduct } from "../../type/Product";
import { ICategory } from "../../type/Category";
import { IAuth } from "../../type/Auth";
import { ICartWishlist } from "../../type/CartWishList";
import { login } from "../../redux/methods/authMethods";
import { NULL } from "sass";
import testData from "../../utilities/testData";

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
        const initialState = {
            loading: true,
            loggedIn: false,
            userInfo: null,
            error: false,
            errorMsg: ''
        }
        expect(Object.keys(store.getState().auth).length).toBe(5)
        expect(store.getState().auth).toStrictEqual(initialState)
    })

    test("should login user with right credentials", async() => {
        const credentials = {
            email: "testMail.com",
            password: "password",
        }
        await store.dispatch(login(credentials))
        const result = {
            loading: false,
            loggedIn: true,
            error: false,
            errorMsg: '',
            userInfo: testData.allUsers[0]
        }
        expect(store.getState().auth).toStrictEqual(result)
    })

    test("should login user with wrong credentials", async() => {
        const credentials = {
            email: "testMail.co",
            password: "password",
        }
        await store.dispatch(login(credentials))
        const result = {
            loading: false,
            loggedIn: false,
            error: true,
            errorMsg: "Email or Password are incorrect",
            userInfo: null
        }

        expect(store.getState().auth).toStrictEqual(result)
    })

})

export { }
