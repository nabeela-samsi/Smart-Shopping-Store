export interface LoginForm {
    email: string
    password: string
}

export interface FormError {
    error: boolean
    errorMessage: string
    fieldErrorInfo : {
        "email": string
        "password": string
    }
}

export interface IButton {
    color: "error" | "inherit" | "primary" | "secondary" | "success" | "info" | "warning"
    handleToggle: () => void
    buttonLabel: string
}