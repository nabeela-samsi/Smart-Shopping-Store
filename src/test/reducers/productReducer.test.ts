import { AnyAction, EmptyObject} from "@reduxjs/toolkit"
import type {} from 'redux-thunk/extend-redux';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"
import axios from "axios"

import { getAllProducts } from "../../redux/reducers/productReducer"
import { createStore } from "../../redux/store"
import server from "../shared/server"
import { Product } from "../../type/Product"
import { Category } from "../../type/Category"
import { PersistPartial } from "redux-persist/es/persistReducer"
import { User } from "../../type/User";

let store: ToolkitStore<EmptyObject & {
    products: Product[];
    categories: Category[];
    users: User[];
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
        expect(store.getState().products.length).toBe(0)
    })
    test("should fetch all the products", async() => {
        await store.dispatch(getAllProducts())
        expect(store.getState().products.length).toBe(3)
    })
    // test("should create a product" , async () => {
    //     const newproduct: CreateProduct  = {
    //         title: "Test Create Product",
    //         price: 1000,
    //         description: "Test Create Product",
    //         categoryid: 1,
    //         images: []
    //     }
    //     await store.dispatch(create(newProdct))
    //     expect(store.getState().productReducer)
    // })
    // test("sort by name asc" , () => {
    //     store.dispatch(sortByName("asc"))
    //     expect(store.getState().productReducer[1].title).toBe("A")
    // })
})

export {}