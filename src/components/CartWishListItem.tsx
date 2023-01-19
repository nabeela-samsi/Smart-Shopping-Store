import { Link, useLocation } from "react-router-dom"
import { Box, Button, ButtonGroup, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addToCart, removeFromCart } from "../redux/reducers/cartReducers";
import { removeFromWishList } from "../redux/reducers/wishListReducers";
import ButtonHandle from "./ButtonHandle";
import { IProduct } from "../type/Product";
import getIcons from "../utilities/getIcon";

const CartWishListItem = (props: IProduct) => {
    const { pathname } = useLocation()
    const isCart = (pathname === '/cart')
    const dispatch = useAppDispatch()
    const { userInfo } = useAppSelector(state => state.auth)
    const products = useAppSelector(state => state.products)
    const getProduct = products.find(product => product.id === props.id)
    const cartRemoveAction = (isDelete:boolean) => {
        if (userInfo) {
            dispatch(removeFromCart({
                userId: userInfo.id,
                productId: props.id,
                originalPrice: getProduct?.price,
                isDelete
            }))
        }
    }
    const cartAddAction = () => {
        if (userInfo) {
            dispatch(addToCart({
                userId: userInfo.id,
                productInfo: props,
                originalPrice: getProduct?.price
            }))
            if (!isCart) {
                wishListRemove()
            }
        }
    }
    const wishListRemove = () => {
        if (userInfo) {
            dispatch(removeFromWishList({
                userId: userInfo.id,
                productId: props.id,
                originalPrice: getProduct?.price
            }))
        }
    }
    return (
        <Box
            component={"div"}
            display={"flex"}
            flexDirection={"row"}
        >
            <Link
                to={`/product/${props.id}`}
                style={{pointerEvents: props.inStock ? 'auto' : 'none'}}
            >
                <img
                    src={props.images[0]}
                    alt={props.title}
                    height="180"
                    style={{ objectFit: "scale-down"}}
                />
            </Link>
            <Box
                component={"div"}
                marginLeft={"2%"}
                marginRight={"10%"}
            >
                <Typography variant={"h4"}>
                    {props.title}
                </Typography>
                <Link
                    to={`/products/searchByCategory?id=${props.category.id}`}
                >
                    in {props.category.name}
                </Link>
                <br />
                <Typography variant={"h5"}>
                    Price: € {props.price}
                </Typography>
                <br />
                {props.inStock
                ?
                isCart ?
                    <ButtonGroup>
                        <Button
                            aria-label="reduce"
                            onClick={() => cartRemoveAction(false)}
                        >
                            {getIcons.remove}
                        </Button>
                        <Button>
                            {props.quantity}
                        </Button>
                        <Button
                            aria-label="increment"
                            onClick={cartAddAction}
                        >
                            {getIcons.add}
                        </Button>
                        <Button
                            aria-label="increment"
                            onClick={() => cartRemoveAction(true)}
                        >
                            {getIcons.trash}
                        </Button>
                    </ButtonGroup>
                    :
                    <>
                        <ButtonHandle
                            color={"primary"}
                            handleToggle={cartAddAction}
                            buttonLabel={"Add to Cart"}
                        />
                        &emsp;
                        &emsp;
                        <ButtonHandle
                            color={"secondary"}
                            handleToggle={wishListRemove}
                            buttonLabel={"Remove From Wishlist"}
                        />
                    </>
                :
                <Typography color={"error"}>
                    Out Of Stock!
                    &emsp;
                    &emsp;
                    <ButtonHandle
                        color={"secondary"}
                        handleToggle={isCart ? () => cartRemoveAction(true) : wishListRemove}
                        buttonLabel={`Remove From ${isCart ? 'Cart' : 'WishList'}`}
                    />
                </Typography>
                }
            </Box>
        </Box>
    )
}

export default CartWishListItem