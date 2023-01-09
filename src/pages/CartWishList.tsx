
import { useLocation } from "react-router-dom"
import { Box } from "@mui/system"

import CartWishListItem from "../components/CartWishListItem"

import { useAppSelector } from "../hooks/reduxHook"
import { IProduct } from "../type/Product"
import { Typography } from "@mui/material"


const CartWishList = () => {
    const {pathname} = useLocation()
    const cartInfo = useAppSelector(state => state.cart)
    const wishListInfo = useAppSelector(state => state.wishList)
    const {userInfo} = useAppSelector(state => state.auth)
    const pageInfo = (pathname === '/cart') ? cartInfo : wishListInfo
    let userBasedInfo: IProduct[] = []
    if(Object.keys(pageInfo)?.length && userInfo ) {
        userBasedInfo = pageInfo[userInfo.email]
    }
    return (
        <>
            {userBasedInfo.length ?
                (
                    <Box
                        display= "flex"
                        flexDirection={"column"}
                        alignContent={"center"}
                        justifyContent={"center"}
                        sx={{p:10}}
                    >
                    {userBasedInfo.map((data) => (
                        <Box
                            component={"div"}
                            key={data.id}
                        >
                            <CartWishListItem {...data} />
                            <br />
                            <hr />
                            <br  />
                        </Box>
                )
                    )}
                    </Box>)
                :
                (
                   <>
                        <Typography
                            textAlign={"center"}
                            variant={"h4"}
                        >
                            No product is added
                        </Typography>
                        <br/>
                   </>
                )
            }
        </>
    )
}

export default CartWishList