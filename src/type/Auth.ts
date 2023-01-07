import { IUser } from "./User"

export interface IAuth {
    loggedIn: boolean
    userInfo: IUser | null
    error: boolean
    errorMsg: string
}

export interface ICredentials {
    email: string
    password: string
}

export interface IReturnedCredentials {
    access_token: string
}