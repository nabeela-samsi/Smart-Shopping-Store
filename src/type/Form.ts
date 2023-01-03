export interface ModalType {
    modalIsOpen: boolean
    toggle: () => void
    formType: string
}

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