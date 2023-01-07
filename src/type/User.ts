export interface IUser{
    id: number
    email: string
    password: string
    name: string
    role: string
    avatar: string
}

export interface INewUser {
    name: string
    email: string
    password: string
    avatar: string | File
}

export interface IUpdateUser {
    id: number
    updateInfo: Partial<INewUser>
}