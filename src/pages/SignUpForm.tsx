import { useEffect, useState } from "react";

import { Alert, AlertTitle, Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { checkEmailExists, login } from "../redux/methods/authMethods";
import { signUpValidationSchema } from "../utilities/validation";
import { IRegister } from "../type/Form";

const SignUpForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [{ error, errorMessage }, setFormError] = useState({
        error: false,
        errorMessage: ''
    })

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            avatar: ""
        },
        resolver: yupResolver(signUpValidationSchema)
    })
    const emailValue = watch("email");
    // useEffect(() => {
    //     dispatch(checkEmailExists(emailValue))
    //     // setFormError({
    //     //     error: authInfo.error,
    //     //     errorMessage: authInfo.errorMsg
    //     // })
    // },[emailValue])

    const onSubmitAction = async(data: any) => {
        try{

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
                    <TextField
                        {...register("name")}
                        type="text"
                        label={"Your Name"}
                        placeholder={"First and Last name"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon />
                                </InputAdornment>
                            )
                        }}
                        sx={{ m: 2 }}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : null}
                    />
                    <TextField
                        {...register( "avatar")}
                        type="file"
                        sx={{ m: 2 }}
                        error={!!errors.avatar}
                        helperText={errors.avatar ? errors.avatar.message : null}
                    />
                    <TextField
                        {...register("email")}
                        type="email"
                        label={"Email Address"}
                        placeholder={"john@domain.com"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlinedIcon />
                                </InputAdornment>
                            )
                        }}
                        sx={{ m: 2 }}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : null}
                    />
                    <TextField
                        {...register(
                            "password",
                            {
                                required: "password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                                    message: "password does not meet the requirements"
                                }
                            }
                        )}
                        type={"password"}
                        label={"Password"}
                        placeholder={"******"}
                        sx={{ m: 2 }}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : null}
                    />
                    <TextField
                        {...register(
                            "confirmPassword")}
                        type={"password"}
                        label={"Re-enter password"}
                        sx={{ m: 2 }}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword ? errors.confirmPassword.message : null}
                    />
                    <label>Only passwords that meet the following minimum requirements will be accepted</label>
                    <ul>
                        <li>Must be at least 8 characters long.</li>
                        <li>Must contain at least one UPPERCASE alpha character.</li>
                        <li>Must contain at least one lower case alpha character.</li>
                        <li>Must contain at least one numerical character.</li>
                        <li>Must contain at least one special character.</li>
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