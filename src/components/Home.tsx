import { Grid, ImageList, ImageListItem, ImageListItemBar } from "@mui/material"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { getAllCategories } from "../redux/reducers/categoryReducer"
import { getAllProducts } from "../redux/reducers/productReducer"

const Home = () => {
    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => state.categoryReducer)
    const products = useAppSelector(state => state.productReducer)

    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllProducts())
    },[])

    return (
        <div className="home">
            <Grid container justifyContent={"center"} alignItems={"center"} spacing={0}>
                <img alt="The offer"
                src="https://www.coredna.com/files/images/blogs/71/961/ecommerce-discount-coupon-strategies-anniversary.png?w=831&h=346" />
            </Grid>
            <ImageList variant="standard" cols={3} gap={8} sx={{ml:5, mr:5}}>
                {categories.map((item) => (
                    <ImageListItem key={item.id}>
                        <Link to={`/products/${item.id}`}>
                            <img src={item.image} alt={item.name} loading="lazy" />
                            <ImageListItemBar
                                title={item.name}
                                position="top"
                            />
                        </Link>
                    </ImageListItem>
                ))}
            </ImageList>

        </ div>
    )
}

export default Home