import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { yupResolver } from "@hookform/resolvers/yup"
import { Box } from "@mui/system"
import { Button, Grid, InputAdornment, TextField, Typography } from "@mui/material"

import { categoryValidationSchema } from "../utilities/formValidation"
import { ICreateCategory } from "../type/Category"

import { createNewCategory, updateCategory } from "../redux/methods/categoryMethods"
import { categoryFields } from "../utilities/formFields"
import ErrorMessage from "../components/ErrorMessage"

const CategoryForm = () => {
    const formFields = categoryFields
    const navigate =  useNavigate()
    const dispatch = useAppDispatch()
    const authInfo = useAppSelector((state) => state.auth)
    const categories = useAppSelector((state) => state.categories)
    const {id} = useParams()
    const [categoryName, setCategoryname] = useState('')
    const [idValid, setIdValid] = useState(false)
    const isNotAdmin = authInfo.userInfo?.role.toLowerCase() !== 'admin'
    const [{ error, errorMessage }, setFormError] = useState({
        error: false,
        errorMessage: ''
    })
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: "",
            image: ""
        },
        resolver: yupResolver(categoryValidationSchema)
    })
    useEffect(() => {
        if(Number(id) > 0) {
            const getCategory = categories.find(category => category.id === Number(id))
            if(getCategory) {
                setIdValid(true)
                setCategoryname(getCategory.name)
                setValue('name',getCategory.name)
                setValue('image',getCategory.image)
            } else {
                setIdValid(false)
            }
        }
    },[categories, id, setValue])
    const categoryExists = (name: string) => {
        return categories.some(category => category.name.toLowerCase() === name.toLowerCase())
    }
    const onSubmitAction = async(data: ICreateCategory) => {
        try{
            if(categoryName.trim() !== data.name.trim() && categoryExists(data.name)) {
                    setFormError({
                        error: true,
                        errorMessage: "Please provide the unique Category Name"
                    });
            } else {
                setFormError({
                    error: false,
                    errorMessage: ''
                });
                if(Number(id) > 0) {
                    await dispatch(updateCategory({id: Number(id), name: data.name, image: data.image}))
                    navigate(-1)
                }else {
                    await dispatch(createNewCategory(data))
                    navigate(-1)
                }
            }
        } catch(e) {
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
                    <ErrorMessage
                        title={"403 Forbidden"}
                        message={"Only Admins can access the page, you dont have any rights to use it"}
                    />
                )
                :
                (
                    Number(id) > 0 && !idValid ?
                    (
                        <ErrorMessage
                            title={"404 Not Found"}
                            message={"The provided categoryID is not found in our database."}
                        />
                    )
                    :
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
                                        title={"400 Bad Request"}
                                        message={errorMessage}
                                    />
                                }
                                <Typography variant="h4">
                                    {categoryName.trim().length ?
                                        `Update ${categoryName}` :
                                        "Create New Category"
                                    }
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
                                    {categoryName.trim().length ? "Update" : "Create"}
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