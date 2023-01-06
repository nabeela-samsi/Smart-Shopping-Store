import { UseFormRegister } from "react-hook-form"

export interface LoginForm {
    email: string
    password: string
}

export interface IButton {
    color: "error" | "inherit" | "primary" | "secondary" | "success" | "info" | "warning"
    handleToggle: () => void
    buttonLabel: string
}

export interface IUserForm {
    isLogin: Boolean
    error: boolean
    errorMessage: string
    formSubmitAction: (data: IRegister) => boolean
}

export interface IRegister {
    name: string
    email: string
    loginPassword: string
    singUpPassword: string
    confirmPassword: string
    avatar: string
}

export interface FieldMessage {
    message: string
}

export interface FieldName {
    name: FieldMessage
}

export interface IInputTextField {
    data: UseFormRegister<IRegister>
    label: string
    type: string
    placeholder: string
    displayIcon: Boolean
    IconPosition: string
    errors: FieldName
}