import * as yup from 'yup';

export const signUpValidationSchema = yup.object(
    {
        name: yup.string().trim()
            .required("Name is required")
            .min(2,"Name should be atleast or more than 2 characters"),
        avatar: yup.string().trim()
            .required("Profile image is required")
            .url("Please provide the valid Image URL"),
        email: yup.string().trim()
            .required("Email is required")
            .email("Please provide valid email address"),
        password: yup.string().trim()
            .required("Password is required")
            .matches(
                /^(?=[a-zA-Z0-9?]{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*/,
                "Password does not meet the requirements"
            ),
        confirmPassword: yup.string().trim()
            .required("Confirm Password is required")
            .oneOf([yup.ref('password'), null], 'Confirm Password does not match')
    }
)

export const loginValidationSchema = yup.object(
    {
        email: yup.string().trim()
            .required("Email is required")
            .email("Please provide valid email address"),
        password: yup.string().trim()
            .required("Password is required")
    }
)

export const categoryValidationSchema = yup.object(
    {
        name: yup.string().trim()
            .required("Name is required")
            .min(2,"Name should be atleast or more than 2 characters"),
        image: yup.string().trim()
            .required("Image is required")
            .url("Please provide the valid Image URL")
    }
)

export const productValidationSchema = yup.object(
    {
        title: yup.string().trim()
            .required("Title is required")
            .min(2,"Title should be atleast or more than 2 characters"),
        description: yup.string().trim()
            .required("Description is required")
            .min(2,"Description should be atleast or more than 2 characters"),
        price: yup.number()
            .required("Price is required")
            .typeError("Please enter a valid number")
            .min(1,"Price cannot be 0 or negative"),
        images: yup.string()
            .required("Atleast one image URL required"),
        // categoryId: yup.string().required("Select your")
        categoryId: yup.mixed()
            .required("Please select one of the category")
            .notOneOf([0], "Please select one of the category")
    }
)