import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { signUpValidationSchema } from "../utilities/formValidation";
import { INewUser } from "../type/User";
import { createNewUser, updateUser } from "../redux/methods/userMethods";
import { userFields } from "../utilities/formFields";
import ErrorMessage from "../components/ErrorMessage";

const UserForm = () => {
    const formFields = userFields
    const authInfo = useAppSelector(state => state.auth)
    const usersInfo = useAppSelector(state => state.users)
    const { id } = useParams()
    const [idValid, setIdValid] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [{ error, errorMessage }, setFormError] = useState({
        error: false,
        errorMessage: ''
    })
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            avatar: ""
        },
        resolver: yupResolver(signUpValidationSchema)
    })
    useEffect(() => {
        if (Number(id) > 0) {
            if (authInfo.userInfo?.id === Number(id) && authInfo.userInfo && authInfo.loggedIn) {
                setIdValid(true)
                setValue('name', authInfo.userInfo.name)
                setValue('avatar', authInfo.userInfo.avatar)
                setValue('email', authInfo.userInfo.email)
                setValue('password', authInfo.userInfo.password)
                setValue('confirmPassword', authInfo.userInfo.password)
            } else {
                setIdValid(false)
            }
        }
    }, [authInfo.loggedIn, authInfo.userInfo, id, setValue])
    const emailExists = (email: string) => {
        return usersInfo.some(user => user.email.toLowerCase() === email.toLowerCase())
    }
    const onSubmitAction = async (data: INewUser) => {
        try {
            if (emailExists(data.email) && !authInfo.loggedIn) {
                setFormError({
                    error: true,
                    errorMessage: "Please provide the unique Email"
                });
            } else if (authInfo.loggedIn && data.email.trim() !== authInfo.userInfo?.email.trim()) {
                if (emailExists(data.email)) {
                    setFormError({
                        error: true,
                        errorMessage: "Please provide the unique Email"
                    });
                }
            } else {
                setFormError({
                    error: false,
                    errorMessage: ''
                });
                if (Number(id) > 0) {
                    await dispatch(updateUser({ id: Number(id), updateInfo: data }))
                    navigate('/')
                } else {
                    await dispatch(createNewUser(data))
                    navigate('/login')
                }
            }
        } catch (e) {
            setFormError({
                error: true,
                errorMessage: "Something went wrong please try again later"
            })
            return error
        }
    }
    return (
        <>
            {!idValid && Number(id) ?

                (
                    <ErrorMessage
                        title="403 Unauthorized"
                        message="Permission denied to access"
                    />
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
                                autoComplete="off"
                                onSubmit={handleSubmit(onSubmitAction)}
                            >
                                {(error) &&
                                    <ErrorMessage
                                        title={"400 Bad Request"}
                                        message={errorMessage}
                                    />
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
                                    {authInfo.loggedIn ? "save" : "Sign Up"}
                                </Button>
                                {!authInfo.loggedIn &&
                                    (
                                        <>
                                            <Typography display={"flex"} alignContent="center" justifyContent={"center"} color="red" component="span">
                                                By creating an account, you agree to <br /> Smart Shopping terms and conditions.
                                            </Typography>
                                            <Typography component="span" display={"flex"} alignContent="center" justifyContent={"center"} sx={{ m: 3 }} >
                                                Already have an account? &nbsp; <Link to="/login"> Log In </Link>
                                            </Typography>
                                        </>
                                    )
                                }
                            </Box>
                        </Grid>
                    </Grid>
                )
            }
        </>
    )
}

export default UserForm