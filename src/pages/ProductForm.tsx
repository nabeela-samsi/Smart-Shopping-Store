import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { yupResolver } from "@hookform/resolvers/yup"
import { Box } from "@mui/system"
import { Button, Grid, InputAdornment, MenuItem, NativeSelect, TextField, TextareaAutosize, Typography } from "@mui/material"
import { AxiosError } from "axios"

import { productValidationSchema } from "../utilities/formValidation"
import { ICreateProduct } from "../type/Product"
import { productFields } from "../utilities/formFields"
import { createNewProduct, updateProduct } from "../redux/methods/productMethods"
import ErrorMessage from "../components/ErrorMessage"

const ProductForm = () => {
    const navigate =  useNavigate()
    const dispatch = useAppDispatch()
    const authInfo = useAppSelector((state) => state.auth)
    const categories = useAppSelector((state) => state.categories)
    const products = useAppSelector((state) => state.products)
    const {id} = useParams()
    const [productName, setProductName] = useState('')
    const [idValid, setIdValid] = useState(false)
    const formFields = productFields
    const isNotAdmin = authInfo.userInfo?.role.toLowerCase() !== 'admin'
    const [{ error, errorMessage }, setFormError] = useState({
        error: false,
        errorMessage: ''
    })
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            title: '',
            description: '',
            categoryId: 0,
            images: '',
            price: 0
        },
        resolver: yupResolver(productValidationSchema)
    })
    useEffect(() => {
        if(Number(id) > 0) {
            const getProduct = products.find(product => product.id === Number(id))
            if(getProduct) {
                setIdValid(true)
                const getCategory = categories.findIndex(category => category.id === getProduct.category.id)

                setProductName(getProduct.title)
                setValue('categoryId', getProduct.category.id, {shouldValidate: true})
                setValue('title',getProduct.title)
                setValue('description',getProduct.description)
                setValue('price',getProduct.price)
                const imageToString = getProduct.images.toString()
                setValue('images',imageToString)
            } else {
                setIdValid(false)
            }
        }
    },[id])
    const onSubmitAction = async(data: ICreateProduct) => {
        try{
            const imageString = data.images as string
            const imageArray = imageString.replaceAll(' ','').split(',')

            setFormError({
                error: false,
                errorMessage: ''
            });
            const productData = {
                    title: data.title,
                    price: data.price,
                    description: data.description,
                    categoryId: data.categoryId,
                    images: imageArray
                }
            if(Number(id) > 0) {
                await dispatch(updateProduct({id: Number(id), updateInfo:productData}))
                navigate(-1)
            } else {
                await dispatch(createNewProduct({
                    title: data.title,
                    price: data.price,
                    description: data.description,
                    categoryId: data.categoryId,
                    images: imageArray
                }))
                navigate(-1)
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
                                        {productName.trim().length ?
                                            `Update ${productName}` :
                                            "Create New Product"
                                        }
                                </Typography>
                                {formFields.map((field, index) => {
                                    return (
                                        <>
                                            {(field.type === 'select')
                                                ?
                                                <TextField
                                                    {...register(field.registerValue)}
                                                    key={field.label + index }
                                                    select
                                                    defaultValue={0}
                                                    label={field.label}
                                                    placeholder={field.placeholder}
                                                    SelectProps={{
                                                        native: true
                                                    }}
                                                    sx={{ m: 2 }}
                                                    error={!!errors[field.registerValue]}
                                                    helperText={errors[field.registerValue] ? errors[field.registerValue]?.message : null}
                                                >
                                                    <option disabled value={0} key={"choose0"}>
                                                         Choose Option
                                                     </option>
                                                     {categories.map((category, key) =>
                                                         <option key={key} value={category.id}>
                                                             {category.name}
                                                         </option>
                                                    )}
                                                </TextField>
                                                :
                                                <TextField
                                                    {...register(field.registerValue)}
                                                    key={field.label + index}
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
                                            }
                                        </>
                                    )
                                })}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ m: 2, fontWeight: "bold" }}
                                >
                                    {productName.trim().length ? "Update" : "Create"}
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