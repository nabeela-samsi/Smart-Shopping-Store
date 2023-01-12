import type {} from 'redux-thunk/extend-redux';
import { createStore } from "../../redux/store"
import { createNewUser, getAllUsers, updateUser } from "../../redux/methods/userMethods";
import { INewUser, IUpdateUser } from "../../type/User";
import userServer from "../shared/userServer";
import { TStore } from "../../type/Store";

let store: TStore

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