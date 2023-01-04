import { useState } from "react";
import { useForm } from "react-hook-form";

import {
    Alert,
    AlertTitle,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material"
import { Box } from "@mui/system"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../redux/reducers/authReducers";

const LogInForm =  () => {
    const users = useAppSelector(state => state.users)
    const [showPassword, setPasswordVisibilty] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [{error, errorMessage}, setFormError] = useState({
        error: false,
        errorMessage: ''
    })
    const {register, handleSubmit, formState:{errors}} = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handlePasswordVisibility = () => {
        setPasswordVisibilty(!showPassword)
    }

    const onSubmitAction = (data:  {
        email: string;
        password: string;
    }) => {
        const userInfo = users.find((user) => user.email === data.email && user.password === data.password)
        if(userInfo) {
            setFormError({
                error: false,
                errorMessage: ""
            })
            dispatch(userLogin({
                loggedIn: true,
                userInfo
            }))
            navigate("/")
        } else {
            setFormError({
                error: true,
                errorMessage: "The email address or password are incorrect"
            })
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
                    onSubmit={handleSubmit(onSubmitAction)}
                >
                {(error) &&
                    <Alert variant="outlined" severity="error">
                        <AlertTitle>Error: Login failed</AlertTitle>
                        {errorMessage}
                    </Alert>
                }
                    <TextField
                        {...register(
                            "email",
                            {
                                required: "email is required",
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: "please provide valid email address"
                                }
                            }
                        )}
                        type="email"
                        label={"Email Address"}
                        placeholder={"john@domain.com"}
                        InputProps={{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <EmailOutlinedIcon />
                                </InputAdornment>
                            )
                        }}
                        sx={{m:2}}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : null}
                    />
                    <TextField
                        {...register("password", {required: "password is required"})}
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
                        sx={{m:2, fontWeight:"bold"}}
                    >
                        Log In
                    </Button>
                </Box>
                <Typography component="span" display={"flex"} alignContent="center" justifyContent={"center"} sx={{m:3}} >
                    New to Smart Shopping? &nbsp; <Link to="/signup"> create an account </Link>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default LogInForm