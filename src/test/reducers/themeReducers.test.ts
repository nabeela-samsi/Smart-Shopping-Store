import type {} from 'redux-thunk/extend-redux';
import { createStore } from "../../redux/store"
import { switchTheme } from "../../redux/reducers/themeReducers";
import { TStore } from "../../type/Store";

let store: TStore

beforeEach(() => {
    store = createStore()
})

describe("Test all the actions", () => {
    test("should return initial state", () => {
        expect(store.getState().theme.isModeDark).toBe(false)
    })
    test("should add the product in wishlist", () => {
        store.dispatch(switchTheme())
        expect(store.getState().theme.isModeDark).toBe(true)
    })
})

export {}