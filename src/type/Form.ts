export interface LoginForm {
    email: string
    password: string
}

export interface FormError {
    error: boolean
    errorMessage: string
    fieldErrorInfo : Error[]
}

export interface Error {
    field: string
    fieldMessage: string
}