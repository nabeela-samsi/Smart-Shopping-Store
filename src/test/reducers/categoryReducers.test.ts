import type { } from 'redux-thunk/extend-redux';
import { createNewCategory, deletecategory, getAllCategories, updateCategory } from "../../redux/methods/categoryMethods";
import { createStore } from "../../redux/store"
import { ICategory, ICreateCategory } from "../../type/Category";
import categoryServer from "../shared/categoryServer";
import { TStore } from "../../type/Store";

let store: TStore

beforeAll(() => {
    categoryServer.listen()
})

afterAll(() => {
    categoryServer.close()
})

beforeEach(() => {
    store = createStore()
})

describe("Test all the actions", () => {
    test("should return initial state", () => {
        expect(store.getState().categories.length).toBe(0)
    })
    test("should fetch all the categories", async () => {
        await store.dispatch(getAllCategories())
        expect(store.getState().categories.length).toBe(2)
    })
    test("should create a category", async () => {
        const newcategory: ICreateCategory = {
            name: "Test category1",
            image: "https://DummycategoryImage"
        }
        await store.dispatch(createNewCategory(newcategory))
        expect(store.getState().categories.length).toBe(1)
    })
    test("should create a category one by one", async () => {
        const newcategory1: ICreateCategory = {
            name: "Test category1",
            image: "https://DummycategoryImage1"
        }
        await store.dispatch(createNewCategory(newcategory1))
        expect(store.getState().categories.length).toBe(1)

        const newcategory2: ICreateCategory = {
            name: "Test category2",
            image: "https://DummycategoryImage2"
        }
        await store.dispatch(createNewCategory(newcategory2))
        expect(store.getState().categories.length).toBe(2)
    })
    test("should update category", async () => {
        const category: ICategory = {
            id: 1,
            name: "Test category",
            image: "https://DummycategoryImage"
        }
        await store.dispatch(getAllCategories())
        await store.dispatch(updateCategory(category))
        expect(store.getState().categories[0].name).toBe("Test category")
    })
    test("should delete category", async () => {
        const categoryId = 1
        await store.dispatch(getAllCategories())
        await store.dispatch(deletecategory(categoryId))
        expect(store.getState().categories.length).toBe(1)
    })
})

export { }