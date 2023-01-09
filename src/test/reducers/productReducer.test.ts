import { AnyAction, EmptyObject} from "@reduxjs/toolkit"
import type {} from 'redux-thunk/extend-redux';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"

import { createNewProduct, deleteProduct, getAllProducts, updateProduct } from "../../redux/methods/productMethods";
import { createStore } from "../../redux/store"
import server from "../shared/server"
import { PersistPartial } from "redux-persist/es/persistReducer"
import { ICreateProduct, IProduct, IUpdateProduct } from "../../type/Product";
import { ICategory } from "../../type/Category";
import { IAuth } from "../../type/Auth";
import { ICartWishlist } from "../../type/CartWishList";
import { IUser } from "../../type/User";

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
        expect(store.getState().products.length).toBe(0)
    })
    test("should fetch all the products", async() => {
        await store.dispatch(getAllProducts())
        expect(store.getState().products.length).toBe(3)
    })
    test("should create a product" , async () => {
        // const newproduct: ICreateProduct  = {
        //     title: "Test Create Product",
        //     price: 1000,
        //     description: "Test Create Product",
        //     categoryId: 1,
        //     images: ["https://api.lorem.space/image/dummyImage"]
        // }
        const newproduct: ICreateProduct = {
            categoryId: 2,
            description :"cwhlchwilchiwl",
            images:  ['https://i.picsum.photos/id/634/200/200.jpg?hmac=3WUmj9wMd1h3UZICk1C5iydU5fixjx0px9jw-LBezgg', ' https://i.picsum.photos/id/634/200/200.jpg?hmac=3WUmj9wMd1h3UZICk1C5iydU5fixjx0px9jw-LBezgg'],
            price:1,
            title: "New test"
        }
        await store.dispatch(createNewProduct(newproduct))
        expect(store.getState().products.length).toBe(1)
    })
    test("should not create a product" , async () => {
        const newproduct: ICreateProduct  = {
            title: "Test Create Product",
            price: -1000,
            description: "Test Create Product",
            categoryId: 1,
            images: ["https://api.lorem.space/image/dummyImage"]
        }
        await store.dispatch(createNewProduct(newproduct))
        expect(store.getState().products.length).toBe(0)
    })
    test("should create a product one by one" , async () => {
        const newproduct1: ICreateProduct  = {
            title: "Test Create Product1",
            price: 500,
            description: "Test Create Product1",
            categoryId: 1,
            images: ["https://api.lorem.space/image/dummyImage"]
        }
        await store.dispatch(createNewProduct(newproduct1))
        expect(store.getState().products.length).toBe(1)

        const newproduct2: ICreateProduct  = {
            title: "Test Create Product2",
            price: 1000,
            description: "Test Create Product2",
            categoryId: 1,
            images: ["https://api.lorem.space/image/dummyImage"]
        }
        await store.dispatch(createNewProduct(newproduct2))
        expect(store.getState().products.length).toBe(2)
    })
    test("should update product" , async () => {
        const product: IUpdateProduct = {
            id: 1,
            updateInfo: {
                title: "Test Product",
                price: 49,
                description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
                images: ["https://api.lorem.space/image/dummyImage"]
            }
        }
        await store.dispatch(getAllProducts())
        await store.dispatch(updateProduct(product))
        expect(store.getState().products[0].title).toBe("Test Product")
        expect(store.getState().products[0].price).toBe(49)
    })
    test("should delete product" , async () => {
        const productID = 1
        await store.dispatch(getAllProducts())
        await store.dispatch(deleteProduct(productID))
        expect(store.getState().products.length).toBe(2)
    })
})

export {}