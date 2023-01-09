import { ChangeEvent, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
    Alert,
    AlertTitle,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Pagination,
    Typography
} from "@mui/material"

import { useAppSelector} from "../hooks/reduxHook"
import { usePagination } from "../hooks/usePagination"
import { IProduct } from "../type/Product"
import getIcons from "../utilities/getIcon"

const ListOfProducts = () => {
    const {userInfo} = useAppSelector(state => state.auth)
    const isAdmin = userInfo?.role.toLowerCase() === 'admin'
    const {pathname} = useLocation()
    const getLocation = useLocation().search
    const categoryId = new URLSearchParams(getLocation).get("id")
    const productName = new URLSearchParams(getLocation).get("name")
    const products = useAppSelector(state => state.products)
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredProducts, setfilteredProducts] = useState<IProduct[]>([])
    const pageLimit = 12
    const pagecount = Math.ceil(filteredProducts.length / pageLimit)
    const productsPagination = usePagination(filteredProducts, pageLimit)

    const handlePagechange = (_: ChangeEvent<unknown>, p: number) => {
        setCurrentPage(p);
        productsPagination.jumpToPage(p)
    }

    useEffect (() => {
        let dataFiltering = products
        if(Number(categoryId) > 0) {
            dataFiltering = products.filter(product => product.category.id === Number(categoryId))
        } else if(productName) {
            dataFiltering = products.filter(product => product.title.toLowerCase().includes(productName.toLowerCase()))
        }
        setfilteredProducts(dataFiltering)
    },[categoryId, productName, products])

    return (
        <>
            {filteredProducts.length > 0 ?
                <>
                    <Pagination
                        className="pagination"
                        count = {pagecount}
                        size="large"
                        page={currentPage}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePagechange}
                    />
                    <Grid
                        container
                        spacing={4}
                        direction="row"
                        sx={{pr:10, pl:10}}
                    >
                        {productsPagination.currentPageData().map((data) => (
                            <Grid
                                item
                                xs={2}
                                key={data.id}
                            >
                                <Link
                                    to={`/product/${data.id}`}
                                    style={{textDecoration: 'none'}}
                                    state={{previousPath: pathname}}
                                >
                                    <Card variant="outlined">
                                        <CardActionArea>
                                            <CardMedia
                                                component={"img"}
                                                image={data.images[0]}
                                                alt={data.title}
                                            />
                                            <CardContent>
                                                <Typography fontWeight={"bold"} noWrap={true}>
                                                    {data.title}
                                                </Typography>
                                                <Typography variant="caption">
                                                    {data.category.name}
                                                </Typography>
                                                <Typography fontWeight={"bold"}>
                                                    € {data.price}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Link>
                                {isAdmin && (
                                    <>
                                        <IconButton>
                                            {getIcons.edit}
                                        </IconButton>
                                        <IconButton>
                                            {getIcons.trash}
                                        </IconButton>
                                    </>
                        )}
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count = {pagecount}
                        size="large"
                        page={currentPage}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePagechange}
                    />
                </>
            :
                <Alert severity="error">
                    <AlertTitle>
                        Sorry, no results found!
                    </AlertTitle>
                    <Typography>
                        Please check the spelling or try searching for something else
                    </Typography>
                </Alert>
            }
        </>
    )
}

export default ListOfProducts