import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import {  Button, Grid, MobileStepper, Typography } from "@mui/material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useAppSelector } from "../hooks/reduxHook"

import { Product } from "../type/Reducers";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducers";
import { addToWishList } from "../redux/reducers/wishListReducers";

const ProductDetails = () => {
    const dispatch = useDispatch()
    const {userInfo} = useAppSelector(state => state.auth)
    const {state} =  useLocation()
    const {id} = useParams()
    const products = useAppSelector(state => state.products)
    const [productDetails, setProductDetails] = useState<Product>()
    const [activeStep, setActiveStep] = useState(0)
    const [maxStep, setMaxStep] = useState(0)

    useEffect(() => {
        for(let item in products) {
            if(Number(id) === products[item].id) {
                setMaxStep(products[item].images.length)
                setProductDetails(products[item])
            }
        }
    },[products, id])

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    const handleCartAction = () => {
        if(userInfo && productDetails) {
            dispatch(addToCart({
                email: userInfo.email,
                productInfo: productDetails
            }))
        }
    }

    const handleWishListAction = () => {
        if(userInfo && productDetails) {
            dispatch(addToWishList({
                email: userInfo.email,
                productInfo: productDetails
            }))
        }
    }

    return (
        <>
            {productDetails ?
                <>
                    <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "center" }}>
                        <Grid>
                            <Link
                                to={state.previousPath}
                                    style={{textDecoration: "none", margin:5}}
                                >
                                    <ArrowBackIcon
                                        fontSize="large"
                                        sx={{mt:2,mb:2}}
                                    />
                            </Link>
                            <Typography
                                variant={"h4"}
                                component="span"
                            >
                                {productDetails.title} <br/>
                            </Typography>
                            <Typography
                                component="span"
                                variant={"body1"}
                                color="primary"
                            >
                                <Link
                                    to={`/products/searchByCategory?id=${productDetails.category.id}`}
                                >
                                    in {productDetails.category.name}
                                </Link>
                            </Typography>
                            <hr/>
                            <img
                                src={productDetails.images[activeStep]}
                                alt={productDetails.title}
                            />
                            <MobileStepper
                                steps={maxStep}
                                position="static"
                                variant="dots"
                                activeStep={activeStep}
                                nextButton={
                                    <Button
                                        size="small"
                                        onClick={handleNext}
                                        disabled={activeStep === maxStep - 1}
                                    >
                                        Next
                                        <KeyboardArrowRight />
                                    </Button>
                                }
                                backButton={
                                    <Button
                                        size="small"
                                        onClick={handleBack}
                                        disabled={activeStep === 0}
                                    >
                                        <KeyboardArrowLeft />
                                        Back
                                    </Button>
                                }
                            />
                        </Grid>
                        <Grid sx={{p:5}}>
                            <Typography style={{ maxWidth:"50vw"}} component="span">
                                Description: {productDetails.description} <br/>
                            </Typography>
                            <Typography variant="h5" component="span">
                            Price: € {productDetails.price} <br/>
                            </Typography>
                            <Button variant="contained" sx={{m:5}} onClick={handleCartAction}>
                                Add to Cart
                            </Button>
                            <Button variant="contained" color="warning" onClick={handleWishListAction}>
                                Add to Wishlist
                            </Button>
                        </Grid>
                    </Grid>
                </>
            :
            ''
            }
        </>
    )
}

export default ProductDetails