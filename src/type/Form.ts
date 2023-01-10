import { ICreateCategory } from "./Category"

export interface LoginForm {
    email: string
    password: string
}

export interface IButton {
    color: "error" | "inherit" | "primary" | "secondary" | "success" | "info" | "warning"
    handleToggle: () => void
    buttonLabel: string
}

export interface IRegisterValue {
    registerValue: 'email' |'password' | 'name' | 'avatar' | 'confirmPassword'
}

export interface IModal {
    showModal: boolean
    handleModalAction: () => void
    formType: string
}

export interface IFormDisplay {
    defaultValues: ICreateCategory
    validationType: ICreateCategory
}
