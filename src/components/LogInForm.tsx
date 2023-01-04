import { useState } from "react";
import { useForm } from "react-hook-form";

import {
    Alert,
    AlertTitle,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    TextField
} from "@mui/material"
import { Box } from "@mui/system"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { useAppSelector } from "../hooks/reduxHook";
import { Link, useNavigate } from "react-router-dom";

const LogInForm =  () => {
    const users = useAppSelector(state => state.users)
    const [showPassword, setPasswordVisibilty] = useState(false)
    const navigate = useNavigate()
    const [{error, errorMessage}, setFormError] = useState({
        error: false,
        errorMessage: ''
    })
    const {register, handleSubmit,watch, control,formState:{errors}} = useForm({
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
        setFormError({
            error: false,
            errorMessage: ""
        })
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if(!emailRegex.test(data.email)) {
            setFormError({
                error: true,
                errorMessage: "please provide valid email address"
            })
        } else {
            const isDataMatch = users.some((user) => user.email === data.email && user.password === data.password)
           if(isDataMatch) {
                navigate("/")
           } else {
            setFormError({
                error: true,
                errorMessage: "The email address or password are incorrect"
            })
           }
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
                        {...register("email", {required: "email is required"})}
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
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignContent={"center"}
                    justifyContent={"center"}
                >
                <Link to="/signup">
                        New to Smart Shopping? create an account
                </Link>
                </Box>
            </Grid>
        </Grid>
    )
}

export default LogInForm