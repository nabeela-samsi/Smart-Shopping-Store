import { ChangeEvent, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
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
import ErrorMessage from "../components/ErrorMessage"

const ListOfProducts = () => {
    const {userInfo} = useAppSelector(state => state.auth)
    const categories = useAppSelector(state => state.categories)
    const products = useAppSelector(state => state.products)
    const isAdmin = userInfo?.role.toLowerCase() === 'admin'
    const getLocation = useLocation().search
    const categoryId = new URLSearchParams(getLocation).get("id")
    const productName = new URLSearchParams(getLocation).get("name")
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredProducts, setfilteredProducts] = useState<IProduct[]>([])
    const pageLimit = 12
    const pagecount = Math.ceil(filteredProducts.length / pageLimit)
    const productsPagination = usePagination(filteredProducts, pageLimit)
    const [noDataMsg, setNoDataMsg] = useState('')
    const isIdValid = Number(categoryId) > 0 ? categories.some(category => category.id === Number(categoryId)) : false

    const handlePagechange = (_: ChangeEvent<unknown>, p: number) => {
        setCurrentPage(p);
        productsPagination.jumpToPage(p)
    }

    useEffect (() => {
        let dataFiltering = products
        if(Number(categoryId) > 0) {
            dataFiltering = products.filter(product => product.category.id === Number(categoryId))
            setNoDataMsg(`Sorry, the admin forgot to add products for this category. Please do come later. Thank you`)
        } else if(productName) {
            dataFiltering = products.filter(product => product.title.toLowerCase().includes(productName.toLowerCase()))
            setNoDataMsg("Sorry, no results found!. Please check the spelling or try something else")
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
                                >
                                    <Card variant="outlined">
                                        <CardActionArea>
                                            <CardMedia
                                                component={"img"}
                                                image={data.images[0]}
                                                alt={data.title}
                                                height="300"
                                                style={{objectFit:"scale-down"}}
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
                                        <Link to={`/product/edit/${data.id}`} style={{textDecoration: "none"}}>
                                            <IconButton>
                                                {getIcons.edit}
                                            </IconButton>
                                        </Link>
                                        <Link to={`/product/delete/${data.id}`} style={{textDecoration: "none"}} state={{title:data.title}}>
                                            <IconButton>
                                                {getIcons.trash}
                                            </IconButton>
                                        </Link>
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
                isIdValid ?
                (
                    <Typography variant="h5" textAlign={"center"} pt={10} pb={10}>
                        {noDataMsg}
                    </Typography>
                )
                :
                (
                    <ErrorMessage
                        title={"404 Not Found"}
                        message={"The provided categoryID is not found in our database."}
                    />
                )

            }
        </>
    )
}

export default ListOfProducts