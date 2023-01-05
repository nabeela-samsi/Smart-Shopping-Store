import { useState } from "react";
import { useForm } from "react-hook-form";

import {
    Alert,
    AlertTitle,
    Button,
    CircularProgress,
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
import { getUserSessionInfo, login } from "../redux/methods/authMethods";

const LogInForm =  () => {
    const authInfo = useAppSelector ((state) =>  state.auth)
    const [error, setError] = useState("");
    console.log(authInfo)
    const [showPassword, setPasswordVisibilty] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {register, handleSubmit, formState:{errors}} = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handlePasswordVisibility = () => {
        setPasswordVisibilty(!showPassword)
    }

    const onSubmitAction = async({email, password}:  {
        email: string;
        password: string;
    }) => {
         await dispatch(login({email, password}))
         if(authInfo.error){
            setError(authInfo.errorMsg);
            setTimeout(() => {setError('')}, 4000)
         } else  {
            navigate('/')
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
                        {error}
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