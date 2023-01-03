import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import {  Button, Grid, MobileStepper, Typography } from "@mui/material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"

import { useAppSelector } from "../hooks/reduxHook"

import { Product } from "../type/Product"

const ProductDetails = () => {
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
    },[])

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    return (
        <>
            {productDetails ?
                <>
                    <Link
                        to={state.previousPath}
                        style={{textDecoration: "none"}}
                    >
                        <Button
                            variant="contained"
                            color="inherit"
                            sx={{m:5}}
                        >
                            Back to results
                        </Button>
                    </Link>
                    <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "center" }}>
                        <Grid>
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
                            <Typography style={{ maxWidth:"50vw"}}>
                                Description: {productDetails.description}
                            </Typography>
                            <Typography variant="h5">
                            Price: € {productDetails.price}
                            </Typography>
                            <Button variant="contained" sx={{m:5}}>
                                Add to Cart
                            </Button>
                            <Button variant="contained" color="warning">
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