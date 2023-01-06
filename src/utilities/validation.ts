import * as yup from 'yup';

export const signUpValidationSchema = yup.object(
    {
        name: yup.string().trim()
            .required("Name is required")
            .min(2,"Name should be atleast or more than 2 characters"),
        avatar: yup.mixed()
            .test({
                test: value => value.length > 0,
                message: "Please upload the photo"
            }),
        email: yup.string().trim()
            .required("Email is required")
            .email("Please provide valid email address"),
        password: yup.string().trim()
            .required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
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