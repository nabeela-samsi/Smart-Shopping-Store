import { FormError, LoginForm } from "../type/Form"

export const loginFormValidation = ({email,password}: LoginForm) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if((!email.trim().length && !password.trim().length)) {
        return {
            error: true,
            errorMessage: "Validation Error",
            fieldErrorInfo: {
            "email":"!email is required",
            "password":"!password is required"
            }
        }
    } else if(!email.trim().length) {
        return {
            error: true,
            errorMessage: "Validation Error",
            fieldErrorInfo: {
                "email":"!email is required",
                "password":""
            }
        }
    } else if(!password.trim().length) {
        return {
            error: true,
            errorMessage: "Validation Error",
            fieldErrorInfo: {
                "email":"",
                "password":"password is required"
            }
        }
    }

    if(email.trim().length && !emailRegex.test(email)) {
        return {
            error: true,
            errorMessage: "Validation Error",
            fieldErrorInfo: {
                "email":"!please enter valid email ID",
                "password":""
            }
        }
    }

    return {
        error: false,
        errorMessage: "",
        fieldErrorInfo: {
            "email": "",
            "password": ""
        }
    }
}