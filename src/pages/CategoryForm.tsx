import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { categoryValidationSchema } from "../utilities/formValidation"
import { ICreateCategory } from "../type/Category"
import { Box } from "@mui/system"
import { Alert, AlertTitle, Autocomplete, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import { AxiosError } from "axios"
import { createNewCategory } from "../redux/methods/categoryMethods"
import { categoryFields } from "../utilities/formFields"

const CategoryForm = () => {
    const formFields = categoryFields
    const authInfo = useAppSelector((state) => state.auth)
    const categories = useAppSelector((state) => state.categories)
    const isNotAdmin = authInfo.userInfo?.role.toLowerCase() !== 'admin'
    const navigate =  useNavigate()
    const dispatch = useAppDispatch()
    const [{ error, errorMessage }, setFormError] = useState({
        error: false,
        errorMessage: ''
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            image: ""
        },
        resolver: yupResolver(categoryValidationSchema)
    })
    const categoryExists = (name: string) => {
        return categories.some(category => category.name.toLowerCase() === name.toLowerCase())
    }
    const onSubmitAction = async(data: ICreateCategory) => {
        try{
            if(categoryExists(data.name)){
                setFormError({
                    error: true,
                    errorMessage: "Please provide the unique Category Name"
                });
            } else {
                setFormError({
                    error: false,
                    errorMessage: ''
                });
                await dispatch(createNewCategory(data))
                navigate('/')
            }
        } catch(e) {
            const error = e instanceof AxiosError
            setFormError({
                error: true,
                errorMessage: "Something went wrong please try again"
            });
        }
    }

    return (
        <>
            {isNotAdmin?
                (
                    <>
                    </>
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
                                <Typography variant="h4">
                                        Create New Category
                                </Typography>
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
                                                        {field.displayIcon}
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
                                    Create
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                )
            }
        </>
    )
}

export default CategoryForm