import { AnyAction, EmptyObject } from "@reduxjs/toolkit"
import type { } from 'redux-thunk/extend-redux';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"

import { createStore } from "../../redux/store"
import server from "../shared/server"
import { PersistPartial } from "redux-persist/es/persistReducer"

import { IProduct } from "../../type/Product";
import { ICategory } from "../../type/Category";
import { IAuth, IUser } from "../../type/Auth";
import { ICartWishlist } from "../../type/CartWishList";
import { createNewUser, login, updateUser } from "../../redux/methods/authMethods";
import { NULL } from "sass";
import testData from "../../utilities/testData";
import { INewUser, IUpdateUser } from "../../type/Form";

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

    test("should update the new user", async() => {
        const newUserData: INewUser= {
            name: "first name",
            avatar: "https://i.picsum.photos/id/1021/200/200.jpg?hmac=5Jzd15OWoPw0fwvsvL05A1BAIN_B543TvjlxqGk1PDU",
            email: "testMail2@domain.com",
            password: "AbTest1234"
        }

        await store.dispatch(createNewUser(newUserData))
        expect(store.getState().auth.errorMsg).toBe("")
        expect(store.getState().auth.error).toBe(false)
    })

    test("should update the user such that email is unique", async() => {
        const updateUserInfo: IUpdateUser = {
            id:1,
            isChangeEmail: false,
            updateInfo: {
                email: "mariaTest@mail.com",
                name: "first name"
            }
        }
        await store.dispatch(updateUser(updateUserInfo))
        expect(store.getState().auth.errorMsg).toBe("")
        expect(store.getState().auth.error).toBe(false)
    })

    test("should update the user such that no email change", async() => {
        const updateUserInfo: IUpdateUser = {
            id:1,
            isChangeEmail: false,
            updateInfo: {
                email: "maria@mail.com",
                name: "first name"
            }
        }
        await store.dispatch(updateUser(updateUserInfo))
        expect(store.getState().auth.errorMsg).toBe("")
        expect(store.getState().auth.error).toBe(false)
    })
})

export { }
