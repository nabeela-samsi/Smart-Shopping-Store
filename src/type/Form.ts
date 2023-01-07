import { FieldErrorsImpl, UseFormRegister } from "react-hook-form"
import { string } from "yup"

export interface LoginForm {
    email: string
    password: string
}

export interface IButton {
    color: "error" | "inherit" | "primary" | "secondary" | "success" | "info" | "warning"
    handleToggle: () => void
    buttonLabel: string
}

export interface INewUser {
    name: string
    email: string
    password: string
    avatar: string | File
}

export interface IUpdateUser {
    id: number
    isChangeEmail: boolean,
    updateInfo: Partial<INewUser>
}

export interface IRegisterValue {
    registerValue: 'email' |'password' | 'name' | 'avatar' | 'confirmPassword'
}
