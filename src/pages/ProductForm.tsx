import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Box } from "@mui/system"
import { Alert, AlertTitle, Button, Grid, InputAdornment, MenuItem, TextField, Typography } from "@mui/material"
import { AxiosError } from "axios"
import { productValidationSchema } from "../utilities/formValidation"
import { ICreateProduct } from "../type/Product"
import { productFields } from "../utilities/formFields"
import { createNewProduct } from "../redux/methods/productMethods"
import ErrorMessage from "../components/ErrorMessage"

const ProductForm = () => {
    const formFields = productFields
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
            title: "",
            description: "",
            categoryId: 0,
            images: "",
            price: 1
        },
        resolver: yupResolver(productValidationSchema(categories))
    })
    const onSubmitAction = async(data: ICreateProduct) => {
        try{
            const imageString = data.images as string
            const imageArray = imageString.replaceAll(' ','').split(',')

            setFormError({
                error: false,
                errorMessage: ''
            });
            await dispatch(createNewProduct({
                title: data.title,
                price: data.price,
                description: data.description,
                categoryId: data.categoryId,
                images: imageArray
            }))
            navigate('/')
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
                    <ErrorMessage
                        title={"403 Forbidden"}
                        message={"Only Admins can access the page, you dont have any rights to use it"}
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
                                onSubmit={handleSubmit(onSubmitAction)}
                            >
                                {(error) &&
                                    <ErrorMessage
                                        title={"400 Bad Request"}
                                        message={errorMessage}
                                    />
                                }
                                <Typography variant="h4">
                                        Create New Category
                                </Typography>
                                {formFields.map(field => {
                                    return (
                                        <>
                                            {(field.type === 'select')
                                                ?
                                                (<TextField
                                                    {...register(field.registerValue)}
                                                    key={field.label+"select"}
                                                    select
                                                    defaultValue={"choose"}
                                                    label={field.label}
                                                    placeholder={field.placeholder}
                                                    sx={{ m: 2 }}
                                                    error={!!errors[field.registerValue]}
                                                    helperText={errors[field.registerValue] ? errors[field.registerValue]?.message : null}
                                                >
                                                    <MenuItem disabled value="choose" key={"choose0"}>
                                                        Choose Option
                                                    </MenuItem>
                                                    {categories.map((category) =>
                                                        <MenuItem key={category.name + category.id} value={category.id}>
                                                            {category.name}
                                                        </MenuItem>
                                                    )}
                                                </TextField>)
                                                :
                                                (<TextField
                                                    {...register(field.registerValue)}
                                                    key={field.label}
                                                    type={field.type}
                                                    label={field.label}
                                                    placeholder={field.placeholder}
                                                    multiline = {field.type === 'url'}
                                                    rows={4}
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
                                            )}
                                        </>
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

export default ProductForm