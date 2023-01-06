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
import { loginValidationSchema } from "../utilities/validation";
import { IRegister } from "../type/Form";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const LogInForm = () => {
    const authInfo = useAppSelector((state) =>  state.auth)
    const navigate =  useNavigate()
    const [showPassword, setPasswordVisibilty] = useState(false)
    const dispatch = useAppDispatch()
    const [{ error, errorMessage }, setFormError] = useState({
        error: false,
        errorMessage: ''
    })

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(loginValidationSchema)
    })

    const handlePasswordVisibility = () => {
        setPasswordVisibilty(!showPassword)
    }

    const onSubmitAction = async(data: any) => {
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
                setTimeout(() => {setFormError({error: false, errorMessage:""})}, 4000)
             } else  {
                alert("loggedIN")
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
                                <HomeOutlinedIcon color='warning' fontSize="large" />
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
                                    <Alert variant="outlined" severity="error">
                                        <AlertTitle>Error: Login failed</AlertTitle>
                                        {errorMessage}
                                    </Alert>
                                }
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
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    label={"Password"}
                                    placeholder={"******"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handlePasswordVisibility}
                                                >
                                                {showPassword ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{m:2}}
                                    error={!!errors.password}
                                    helperText={errors.password ? errors.password.message : null}
                                    autoComplete="off"
                                />
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