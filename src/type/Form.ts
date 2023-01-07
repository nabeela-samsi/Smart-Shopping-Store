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
