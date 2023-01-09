import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material"

import { AxiosError } from "axios";

import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

import { login } from "../redux/methods/authMethods";

import { ICredentials } from "../type/Auth";
import { loginValidationSchema } from "../utilities/formValidation";
import getIcons from "../utilities/getIcon";
import { loginFields } from "../utilities/formFields";
import ErrorMessage from "../components/ErrorMessage";

const LogInForm = () => {
    const formFields = loginFields
    const authInfo = useAppSelector((state) =>  state.auth)
    const navigate =  useNavigate()
    const [showPassword, setPasswordVisibilty] = useState(false)
    const dispatch = useAppDispatch()
    const [{ error, errorMessage }, setFormError] = useState({
        error: false,
        errorMessage: ''
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(loginValidationSchema)
    })

    const handlePasswordVisibility = () => {
        setPasswordVisibilty(!showPassword)
    }

    const onSubmitAction = async(data: ICredentials) => {
        try{
            const credentials = {
                email: data.email,
                password: data.password,
            }
            await dispatch(login(credentials))
            if(authInfo.error){
                setFormError({
                    error: authInfo.error,
                    errorMessage: authInfo.errorMsg
                });
            } else  {
                setFormError({
                    error: false,
                    errorMessage: ''
                });
                navigate('/')
            }
        }catch(e) {
            const error = e instanceof AxiosError
            return error
        }
    }

    return (
        <>
            {authInfo.loggedIn ?
                (
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >

                        <Typography variant={"h5"} mb={10}>
                            You are already loggedIn
                            <Link to="/">
                                {getIcons.home}
                            </Link>
                        </Typography>
                    </Box>
                )
                :
                (
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
                                onSubmit={handleSubmit(onSubmitAction)}
                            >
                                {(error) &&
                                    <ErrorMessage
                                        title={"401 Unauthorized"}
                                        message={errorMessage}
                                    />
                                }
                                {formFields.map(field => {
                                    return (
                                        <TextField
                                            {...register(field.registerValue)}
                                            key={field.label}
                                            type={field.label === 'Password' ? (showPassword ? 'text' : 'password') : field.type}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {
                                                            ("hidePassword" in field) ?
                                                            (
                                                                <IconButton
                                                                    onClick={handlePasswordVisibility}
                                                                >
                                                                {showPassword ? field.displayPassword : field.hidePassword}
                                                                </IconButton>
                                                            ) :
                                                            field.displayIcon
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ m: 2, fontWeight: "bold" }}
                                >
                                    Log In
                                </Button>
                                <Typography component="span" display={"flex"} alignContent="center" justifyContent={"center"} sx={{m:3}} >
                                    New to Smart Shopping? &nbsp; <Link to="/signup"> create an account </Link>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                )
            }
        </>
    )
}

export default LogInForm