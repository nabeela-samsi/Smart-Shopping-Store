import { Card, CardActionArea, CardContent, CardMedia, Grid, ImageList, ImageListItem, ImageListItemBar, Pagination, Typography } from "@mui/material"
import { height } from "@mui/system"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector} from "../hooks/reduxHook"
import { filterByCategoryID } from "../redux/reducers/productReducer"

const ListOfProducts = () => {
    const params = useParams()
    const products = useAppSelector(state => state.productReducer)
    const dispatch = useAppDispatch()
    const categoryId = (params.categoryid) ? Number(params.categoryid) : 0

    const [currentPage, setCurrentPage] = useState(1)


    useEffect (() => {
        dispatch(filterByCategoryID(categoryId))
    },[dispatch])

    return (
        <>
            {/* <ImageList cols={4} gap={20} sx={{ml:5, mr:5}}>
                {products.map((item) => (
                    <ImageListItem key={item.id} sx={{maxWidth: "60%"}}>
                        <Link to={`/products/${item.id}`}>
                            <img src={item.images[0]} alt={item.title} loading="lazy" />
                            <ImageListItemBar
                                title={item.title}
                                position="bottom"
                            />
                        </Link>
                    </ImageListItem>
                ))}
            </ImageList> */}


            <Grid
                container
                spacing={3}
                direction="row"
                sx={{pr:10, pl:10}}
            >
                {products.map(product => (
                    <Grid
                        item
                        xs={2}
                        key={product.id}

                    >
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component={"img"}
                                    image={product.images[0]}
                                    alt={product.title}

                                />
                                <CardContent>
                                    <Typography>
                                        {product.title}
                                    </Typography>
                                    <Typography>
                                        {product.category.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
           {/* <Pagination
                count={Math.ceil(products.length / 3)}
                page={currentPage}
                variant="outlined"
            /> */}


        </>
    )

}

export default ListOfProducts