import getIcons from "./getIcon"

export const loginFields = [
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

export const userFields = [
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
        placeholder: "https://profileImage",
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

export const categoryFields = [
    {
        label: "Name",
        registerValue: 'name' as 'name' | 'image',
        placeholder: "New category",
        type: "text"
    },
    {
        label: "Category Image",
        registerValue: 'image' as 'name' | 'image',
        placeholder: "https://categoryImage",
        type: "url",
        displayIcon: getIcons.photo
    }
]


export const productFields = [
    {
        label: "Title",
        registerValue: 'title' as 'title' | 'description' | 'categoryId' | 'price' | 'images',
        placeholder: "New Product",
        type: "text"
    }, {
        label: "Description",
        registerValue: 'description' as 'title' | 'description' | 'categoryId' | 'price' | 'images',
        placeholder: "Product Description",
        type: "text"
    }, {
        label: "Select Category",
        registerValue: 'categoryId' as 'title' | 'description' | 'categoryId' | 'price' | 'images',
        placeholder: "",
        type:"select"
    }, {
        label: "Price",
        registerValue: 'price' as 'title' | 'description' | 'categoryId' | 'price' | 'images',
        placeholder: "",
        type:"number",
        displayIcon: getIcons.euro
    }, {
        label: "Product Image(s)",
        registerValue: 'images' as 'title' | 'description' | 'categoryId' | 'price' | 'images',
        placeholder: "https://productImage, https://productImage2, https://productImage3",
        type: "url",
        displayIcon: getIcons.photo
    }
]