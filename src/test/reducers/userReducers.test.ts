import { AnyAction, EmptyObject} from "@reduxjs/toolkit"
import type {} from 'redux-thunk/extend-redux';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"

import { createStore } from "../../redux/store"
import { PersistPartial } from "redux-persist/es/persistReducer"
import { IProduct } from "../../type/Product";
import { ICategory } from "../../type/Category";
import { IAuth } from "../../type/Auth";
import { ICartWishlist } from "../../type/CartWishList";
import { createNewUser, getAllUsers, updateUser } from "../../redux/methods/userMethods";
import { INewUser, IUpdateUser, IUser } from "../../type/User";
import { ISwitchTheme } from "../../type/Theme";
import userServer from "../shared/userServer";

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
    userServer.listen()
})

afterAll(() => {
    userServer.close()
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
        expect(store.getState().users.length).toBe(1)
    })
    test("should create the new user without image", async() => {
        const newUserData: INewUser = {
            name: "first name",
            avatar: "",
            email: "testMail2@domain.com",
            password: "AbTest1234"
        }
        await store.dispatch(createNewUser(newUserData))
        expect(store.getState().users.length).toBe(1)
    })
    test("should update the user", async() => {

        const updateUserInfo: IUpdateUser = {
            id:1,
            updateInfo: {
                email: "mariaTest@mail.com",
                name: "first name"
            }
        }
        await store.dispatch(getAllUsers())
        await store.dispatch(updateUser(updateUserInfo))
        console.log(store.getState().users)
        expect(store.getState().users[0].email).toBe("mariaTest@mail.com")
    })

    test("should update the user such that no email change", async() => {
        const updateUserInfo: IUpdateUser = {
            id: 1,
            updateInfo: {
                email: "testMail@domain.com",
                name: "first name"
            }
        }
        await store.dispatch(getAllUsers())
        await store.dispatch(updateUser(updateUserInfo))
        expect(store.getState().users[0].email).toBe("testMail@domain.com")
    })
})

export {}