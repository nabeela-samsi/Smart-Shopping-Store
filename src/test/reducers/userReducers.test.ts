import { AnyAction, EmptyObject} from "@reduxjs/toolkit"
import type {} from 'redux-thunk/extend-redux';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"

import { createStore } from "../../redux/store"
import server from "../shared/server"
import { PersistPartial } from "redux-persist/es/persistReducer"
import { IProduct } from "../../type/Product";
import { ICategory } from "../../type/Category";
import { IAuth, IUser } from "../../type/Auth";
import { ICartWishlist } from "../../type/CartWishList";
import { getAllUsers } from "../../redux/methods/userMethods";

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
})

export {}