import { useState } from "react";

import { Alert, AlertTitle, Box, Button, Checkbox, FormControl, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../hooks/reduxHook";

const SignUpForm = () => {
    const users = useAppSelector(state => state.users)
    const [{error, errorMessage}, setFormError] = useState({
        error: false,
        errorMessage: ''
    })
    const {register, handleSubmit,watch, control,formState:{errors}} = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            checkBox: false
        }
    })
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
                    {...register(
                        "name",
                        {
                            required: "name is required",
                            minLength: {
                                value: 2,
                                message: "Name should be atleast or more than 2 characters"
                            }
                        }
                    )}
                    type="text"
                    label={"Your Name"}
                    placeholder={"First and Last name"}
                    InputProps={{
                        startAdornment:(
                            <InputAdornment position="start">
                                <AccountCircleIcon />
                            </InputAdornment>
                        )
                    }}
                    sx={{m:2}}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : null}
                />
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
                    type={ "password"}
                    label={"Password"}
                    placeholder={"******"}
                    sx={{m:2}}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : null}
                    autoComplete="off"
                />
                 <TextField
                    {...register(
                        "confirmPassword",
                        {
                            required: "Type your password again",
                            validate: (val: string) => {
                                if(watch("password") !== val) {
                                    return  "Passwords should match"
                                }
                            }
                        }
                    )}
                    type={ "password"}
                    label={"Re-enter password"}
                    sx={{m:2}}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword ? errors.confirmPassword.message : null}
                    autoComplete="off"
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
                    sx={{m:2, fontWeight:"bold"}}
                >
                    Sign Up
                </Button>
                <Typography display={"flex"} alignContent="center" justifyContent={"center"} color="red" component="span">
                    By creating an account, you agree to <br/> Smart Shopping terms and conditions.
                </Typography>
                <Typography component="span" display={"flex"} alignContent="center" justifyContent={"center"} sx={{m:3}} >
                    Already have an account? &nbsp; <Link to="/login"> Log In </Link>
                </Typography>
            </Box>
        </Grid>
    </Grid>
    )
}

export default SignUpForm