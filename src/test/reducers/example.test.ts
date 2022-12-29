import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit"
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"
import axios from "axios"

import { getAllProducts } from "../../redux/reducers/productReducer"
import { createStore, RootState } from "../../redux/store"
import server from "../shared/server"

let store: ToolkitStore<RootState, AnyAction, [ThunkMiddleware<RootState, AnyAction, undefined>]>

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
        expect(store.getState().productReducer.length).toBe(0)
    })
    test("should fetch all the products", async() => {
        await store.dispatch(getAllProducts())
        expect(store.getState().productReducer.length).toBe(3)
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