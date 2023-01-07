import getIcons from "./getIcon"

const loginFields = [
    {
        label: "Email Address",
        registerValue: 'email' as 'email' |'password',
        placeholder: "john@domain.com",
        type: "email",
        displayIcon: getIcons.email
    },
    {
        label: "Password",
        registerValue: 'password' as 'email' |'password',
        placeholder: "*********",
        type: "password",
        displayPassword : getIcons.showPassword,
        hidePassword: getIcons.hidePassword
    }
]

const userFields = [
    {
        label: "Your Name",
        registerValue: 'name' as 'email' |'password' | 'name' | 'avatar' | 'confirmPassword',
        placeholder: "First and Last name",
        type: "text",
        displayIcon: getIcons.user
    },
    {
        label: "Profile Image",
        registerValue: 'avatar' as 'email' |'password' | 'name' | 'avatar' | 'confirmPassword',
        placeholder: "",
        type: "url",
        displayIcon: getIcons.photo
    },
    {
        label: "Email Address",
        registerValue: 'email' as 'email' |'password' | 'name' | 'avatar' | 'confirmPassword',
        placeholder: "john@domain.com",
        type: "email",
        displayIcon: getIcons.email
    },
    {
        label: "Password",
        registerValue: 'password' as 'email' |'password' | 'name' | 'avatar' | 'confirmPassword',
        placeholder: "*********",
        type: "password"
    },
    {
        label: "Confirm Password",
        registerValue: 'confirmPassword' as 'email' |'password' | 'name' | 'avatar' | 'confirmPassword',
        placeholder: "*********",
        type: "password"
    }
]


const userFormFields = {loginFields, userFields}
export default userFormFields