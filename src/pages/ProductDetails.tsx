import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import {  Button, Grid, MobileStepper, Typography } from "@mui/material"

import { useAppSelector } from "../hooks/reduxHook"

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducers";
import { addToWishList } from "../redux/reducers/wishListReducers";
import ButtonHandle from "../components/ButtonHandle";
import { IProduct } from "../type/Product";
import getIcons from "../utilities/getIcon";

const ProductDetails = () => {
    const dispatch = useDispatch()
    const {userInfo} = useAppSelector(state => state.auth)
    const {state} =  useLocation()
    const {id} = useParams()
    const products = useAppSelector(state => state.products)
    const [productDetails, setProductDetails] = useState<IProduct>()
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
                productInfo: productDetails,
                originalPrice: productDetails.price
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
                                    {getIcons.arrowBack}
                            </Link>
                            <Typography
                                variant={"h4"}
                            >
                                {productDetails.title}
                            </Typography>
                            <Typography
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
                                        {getIcons.arrowRight}
                                    </Button>
                                }
                                backButton={
                                    <Button
                                        size="small"
                                        onClick={handleBack}
                                        disabled={activeStep === 0}
                                    >
                                        {getIcons.arrowLeft}
                                        Back
                                    </Button>
                                }
                            />
                        </Grid>
                        <Grid sx={{p:5}}>
                            <Typography style={{ maxWidth:"50vw"}}>
                                Description: {productDetails.description}
                            </Typography>
                            <br/>
                            <Typography variant="h5">
                                Price: € {productDetails.price}
                            </Typography>
                            <br/>
                            <ButtonHandle
                                color={"primary"}
                                handleToggle={handleCartAction}
                                buttonLabel={"Add to Cart"}
                            />
                            &emsp;
                            &emsp;
                            <ButtonHandle
                                color={"warning"}
                                handleToggle={handleWishListAction}
                                buttonLabel={"Add to Wishlist"}
                            />
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