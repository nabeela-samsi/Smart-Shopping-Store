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
import {login} from "../../redux/methods/authMethods";
import testData from "../../utilities/testData";
import { IUser } from "../../type/User";
import { userLogout } from "../../redux/reducers/authReducers";

let store: ToolkitStore<EmptyObject & {
    products: IProduct[];
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
        const initialState = {
            loggedIn: false,
            userInfo: null,
            error: false,
            errorMsg: ''
        }
        expect(Object.keys(store.getState().auth).length).toBe(4)
        expect(store.getState().auth).toStrictEqual(initialState)
    })
    test("should login user with right credentials", async() => {
        const credentials = {
            email: "testMail@domain.com",
            password: "password",
        }
        await store.dispatch(login(credentials))
        const result = {
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
            loggedIn: false,
            error: true,
            errorMsg: "Email or Password are incorrect",
            userInfo: null
        }

        expect(store.getState().auth).toStrictEqual(result)
    })
    test("should log out successfully", async() => {
        const credentials = {
            email: "testMail@domain.com",
            password: "password",
        }
        await store.dispatch(login(credentials))
        const loginResult = {
            loggedIn: true,
            error: false,
            errorMsg: '',
            userInfo: testData.allUsers[0]
        }
        expect(store.getState().auth).toStrictEqual(loginResult)

        store.dispatch(userLogout())
        const loggoutResult = {
            loggedIn: false,
            error: false,
            errorMsg: '',
            userInfo: null
        }
        expect(store.getState().auth).toStrictEqual(loggoutResult)
    })
})

export { }
