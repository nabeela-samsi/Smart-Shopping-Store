import { FormError, LoginForm } from "../type/Form"

export const loginForm = ({email,password}: LoginForm) => {
    let result: FormError ={
        error: false,
        errorMessage: "",
        fieldErrorInfo: []
    }
    return result
}