import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Alert, AlertTitle, Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material"

import { AxiosError } from "axios";

import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

import { signUpValidationSchema } from "../utilities/formValidation";
import userFormFields from "../utilities/userFormFields";
import { INewUser } from "../type/User";
import { createNewUser } from "../redux/methods/userMethods";

const SignUpForm = () => {
    const formFields = userFormFields.userFields
    const authInfo = useAppSelector(state => state.auth)
    const usersInfo = useAppSelector(state => state.users)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [{ error, errorMessage }, setFormError] = useState({
        error: false,
        errorMessage: ''
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            avatar: ""
        },
        resolver: yupResolver(signUpValidationSchema)
    })
    const emailExists = (email: string) => {
        return usersInfo.some(user => user.email === email)
    }
    const onSubmitAction = async(data: INewUser) => {
        try{
            if(emailExists(data.email)) {
                setFormError({
                    error: true,
                    errorMessage: "Please provide the unique Email"
                });
            } else {
                setFormError({
                    error: false,
                    errorMessage: ''
                });
                await dispatch(createNewUser(data))
                if(authInfo.error){
                    setFormError({
                        error: authInfo.error,
                        errorMessage: authInfo.errorMsg
                    });
                } else {
                    navigate('/')
                }
            }

        }catch(e) {
            const error = e instanceof AxiosError
            return error
        }
    }
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={3}>
                <Box
                    component={"form"}
                    noValidate
                    display={"flex"}
                    flexDirection={"column"}
                    alignContent={"center"}
                    justifyContent={"center"}
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmitAction)}
                >
                    {(error) &&
                        <Alert variant="outlined" severity="error">
                            <AlertTitle>Error: Login failed</AlertTitle>
                            {errorMessage}
                        </Alert>
                    }
                    {formFields.map(field => {
                                    return (
                                        <TextField
                                            {...register(field.registerValue)}
                                            key={field.label}
                                            type={field.type}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {
                                                            ("displayIcon" in field) && field.displayIcon
                                                        }
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{ m: 2 }}
                                            error={!!errors[field.registerValue]}
                                            helperText={errors[field.registerValue] ? errors[field.registerValue]?.message : null}
                                        />
                                    )
                                })}
                    <label>Only passwords that meet the following minimum requirements will be accepted</label>
                    <ul>
                        <li>Must be at least 7 characters long.</li>
                        <li>Must contain at least one UPPERCASE alpha character.</li>
                        <li>Must contain at least one lower case alpha character.</li>
                        <li>Must contain at least one numerical character.</li>
                        <li>Must not contain any special character.</li>
                    </ul>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ m: 2, fontWeight: "bold" }}
                    >
                        Sign Up
                    </Button>
                    <Typography display={"flex"} alignContent="center" justifyContent={"center"} color="red" component="span">
                        By creating an account, you agree to <br /> Smart Shopping terms and conditions.
                    </Typography>
                    <Typography component="span" display={"flex"} alignContent="center" justifyContent={"center"} sx={{ m: 3 }} >
                        Already have an account? &nbsp; <Link to="/login"> Log In </Link>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default SignUpForm