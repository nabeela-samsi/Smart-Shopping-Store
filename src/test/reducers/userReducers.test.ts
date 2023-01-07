import { AnyAction, EmptyObject} from "@reduxjs/toolkit"
import type {} from 'redux-thunk/extend-redux';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"

import { createStore } from "../../redux/store"
import server from "../shared/server"
import { PersistPartial } from "redux-persist/es/persistReducer"
import { IProduct } from "../../type/Product";
import { ICategory } from "../../type/Category";
import { IAuth } from "../../type/Auth";
import { ICartWishlist } from "../../type/CartWishList";
import { createNewUser, getAllUsers, updateUser } from "../../redux/methods/userMethods";
import { INewUser, IUpdateUser, IUser } from "../../type/User";

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
        expect(store.getState().users.length).toBe(0)
    })
    test("should fetch all the users", async() => {
        await store.dispatch(getAllUsers())
        expect(store.getState().users.length).toBe(4)
    })
    test("should create the new user", async() => {
        const newUserData: INewUser = {
            name: "first name",
            avatar: "https://i.picsum.photos/id/1021/200/200.jpg?hmac=5Jzd15OWoPw0fwvsvL05A1BAIN_B543TvjlxqGk1PDU",
            email: "testMail2@domain.com",
            password: "AbTest1234"
        }
        await store.dispatch(createNewUser(newUserData))
        expect(store.getState().auth.errorMsg).toBe("")
        expect(store.getState().auth.error).toBe(false)
    })
    test("should update the user", async() => {
        const updateUserInfo: IUpdateUser = {
            id:1,
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
            id: 1,
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

export {}