import { AnyAction, EmptyObject} from "@reduxjs/toolkit"
import type {} from 'redux-thunk/extend-redux';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"

import { getAllCategories } from "../../redux/methods/categoryMethods";
import { createStore } from "../../redux/store"
import server from "../shared/server"
import { PersistPartial } from "redux-persist/es/persistReducer"
import { Auth, CartWishlist, Category, Product, User } from "../../type/Reducers";

let store: ToolkitStore<EmptyObject & {
    products: Product[];
    categories: Category[];
    users: User[];
    auth: Auth;
    cart: CartWishlist;
    wishList: CartWishlist;
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

// describe("Test all the actions", () => {
//     test("should return initial state", () => {
//         expect(store.getState().categories.length).toBe(0)
//     })
//     test("should fetch all the categories", async() => {
//         await store.dispatch(getAllCategories())
//         expect(store.getState().categories.length).toBe(2)
//     })
// })

export {}