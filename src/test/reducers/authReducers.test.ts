import type { } from 'redux-thunk/extend-redux';
import { createStore } from "../../redux/store"
import { login } from "../../redux/methods/authMethods";
import testData from "../../utilities/testData";
import { userLogout } from "../../redux/reducers/authReducers";
import authServer from "../shared/authServer";
import { TStore } from "../../type/Store";

let store: TStore

beforeAll(() => {
    authServer.listen()
})

afterAll(() => {
    authServer.close()
})

beforeEach(() => {
    store = createStore()
})

describe("Test all the actions", () => {
    test("should return initial state", () => {
        const initialState = {
            loggedIn: false,
            userInfo: null,
            error: false,
            errorMsg: ''
        }
        expect(Object.keys(store.getState().auth).length).toBe(4)
        expect(store.getState().auth).toStrictEqual(initialState)
    })
    test("should login user with right credentials", async () => {
        const credentials = {
            email: "testMail@domain.com",
            password: "password",
        }
        await store.dispatch(login(credentials))
        const result = {
            loggedIn: true,
            error: false,
            errorMsg: '',
            userInfo: testData.allUsers[0]
        }
        expect(store.getState().auth).toStrictEqual(result)
    })
    test("should login user with wrong credentials", async () => {
        const credentials = {
            email: "testMail.co",
            password: "password",
        }
        await store.dispatch(login(credentials))
        const result = {
            loggedIn: false,
            error: true,
            errorMsg: "Email or Password are incorrect",
            userInfo: null
        }
        expect(store.getState().auth).toStrictEqual(result)
    })
    test("should log out successfully", async () => {
        const credentials = {
            email: "testMail@domain.com",
            password: "password",
        }
        await store.dispatch(login(credentials))
        const loginResult = {
            loggedIn: true,
            error: false,
            errorMsg: '',
            userInfo: testData.allUsers[0]
        }
        expect(store.getState().auth).toStrictEqual(loginResult)
        store.dispatch(userLogout())
        const loggoutResult = {
            loggedIn: false,
            error: false,
            errorMsg: '',
            userInfo: null
        }
        expect(store.getState().auth).toStrictEqual(loggoutResult)
    })
})

export { }
