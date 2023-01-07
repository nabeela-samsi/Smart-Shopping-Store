import * as yup from 'yup';

export const signUpValidationSchema = yup.object(
    {
        name: yup.string().trim()
            .required("Name is required")
            .min(2,"Name should be atleast or more than 2 characters"),
        avatar: yup.string().trim()
            .required("Avatar is required")
            .url("Please paa the valid Image URL"),
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