import { useState } from "react";

import { Alert, AlertTitle, Box, Button, Grid,InputAdornment, TextField, Typography } from "@mui/material"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const SignUpForm = () => {
    const [{error, errorMessage}, setFormError] = useState({
        error: false,
        errorMessage: ''
    })
    const {register, handleSubmit, watch, formState:{errors}} = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    const isEmailUnique = async(email: string): Promise<Boolean>=> {
        try{
            const authUrl = 'https://api.escuelajs.co/api/v1'
            const checkEmailExists = await axios.post(`${authUrl}/users/is-available`, {email})
            return checkEmailExists.data.isAvailable
        } catch(e: any) {
            setFormError({
                error: true,
                errorMessage: "Something went wrong, please try again later"
            })
            return false
        }
    }

    const onSubmitAction = (data:  {
        email: string;
        password: string;
    }) => {
        setFormError({
            error: false,
            errorMessage: ""
        })
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
                            },
                            validate: async(email: string) => {
                                const checkAvailability = await isEmailUnique(email)
                                if(!checkAvailability) {
                                    return "please provide unique email address"
                                }
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