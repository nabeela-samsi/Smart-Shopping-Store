import { AnyAction, EmptyObject} from "@reduxjs/toolkit"
import type {} from 'redux-thunk/extend-redux';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"

import { createNewProduct, deleteProduct, getAllProducts, updateProduct } from "../../redux/methods/productMethods";
import { createStore } from "../../redux/store"
import { PersistPartial } from "redux-persist/es/persistReducer"
import { ICreateProduct, IProduct, IUpdateProduct } from "../../type/Product";
import { ICategory } from "../../type/Category";
import { IAuth } from "../../type/Auth";
import { ICartWishlist } from "../../type/CartWishList";
import { IUser } from "../../type/User";
import { ISwitchTheme } from "../../type/Theme";
import productServer from "../shared/productServer";
import { sortProduct } from "../../redux/reducers/productReducer";

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
    productServer.listen()
})

afterAll(() => {
    productServer.close()
})

beforeEach(() => {
    store = createStore()
})

describe("Test iniial state and curd actions", () => {
    test("should return initial state", () => {
        expect(store.getState().products.length).toBe(0)
    })
    test("should fetch all the products", async() => {
        await store.dispatch(getAllProducts())
        expect(store.getState().products.length).toBe(3)
    })
    test("should create a product" , async () => {
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

describe("Test sorting actions", () => {
    test("should return sorted state based on price low to high", async () => {
        await store.dispatch(getAllProducts())
        store.dispatch(sortProduct({type: "LOW_TO_HIGH_PRICE"}))
        expect(store.getState().products[0].price).toBe(1)
        expect(store.getState().products[1].price).toBe(20)
        expect(store.getState().products[2].price).toBe(1000)
    })
    test("should return sorted state based on price high to low", async () => {
        await store.dispatch(getAllProducts())
        store.dispatch(sortProduct({type: "HIGH_TO_LOW_PRICE"}))
        expect(store.getState().products[2].price).toBe(1)
        expect(store.getState().products[1].price).toBe(20)
        expect(store.getState().products[0].price).toBe(1000)
    })
    test("should return sorted state based on name A to Z", async () => {
        await store.dispatch(getAllProducts())
        store.dispatch(sortProduct({type: "A-Z"}))
        expect(store.getState().products[0].title).toBe("Handmade Steel Shirt3")
        expect(store.getState().products[1].title).toBe("Jacket")
        expect(store.getState().products[2].title).toBe("shirt")
    })
    test("should return sorted state based on name Z to A", async () => {
        await store.dispatch(getAllProducts())
        store.dispatch(sortProduct({type: "Z-A"}))
        expect(store.getState().products[2].title).toBe("Handmade Steel Shirt3")
        expect(store.getState().products[1].title).toBe("Jacket")
        expect(store.getState().products[0].title).toBe("shirt")
    })
    test("should return state without sorting", async () => {
        await store.dispatch(getAllProducts())
        store.dispatch(sortProduct({type: ""}))
        expect(store.getState().products[2].title).toBe("Handmade Steel Shirt3")
        expect(store.getState().products[0].title).toBe("Jacket")
        expect(store.getState().products[1].title).toBe("shirt")
    })
})

export {}