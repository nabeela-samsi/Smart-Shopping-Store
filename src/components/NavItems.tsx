import { useState } from "react";
import { userLogout } from "../redux/reducers/authReducers";
import { Link } from "react-router-dom";

import { Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"

import { StyledBadge } from "../utilities/styles";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import getIcons from "../utilities/getIcon";
import { IUserInfo } from "../type/CartWishList";
import { IMenuBar } from "../type/MenuBar";

export const MenuBar = (props: IMenuBar) => {
    const {loggedIn, isAdmin} = props
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
     }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleLogoutAction = () => {
        dispatch(userLogout())
    }
    return (
        <>
            <Tooltip
                title="account-menu"
                arrow
            >
                <Button
                    aria-controls={open ? "simple-menu" : undefined}
                    aria-expanded = {open ? 'true' : undefined}
                    arai-haspopup="true"
                    onMouseOver={handleMenuOpen}
                    variant="text"
                    color="inherit"
                >
                   {getIcons.user}
                   Profile
                </Button>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleMenuClose}
                disableAutoFocusItem
                PaperProps={{
                    elevation: 0,
                }}
                transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                }}
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom'
                }}
                MenuListProps={{onMouseLeave: handleMenuClose}}
            >
                {!loggedIn && (
                    <MenuItem>
                        <Typography component="span">
                            <Typography fontWeight={"bold"} component="span">
                                Welcome <br/>
                            </Typography>
                            <Typography variant="subtitle2" component="span">
                                To access wishlist and cart please login <br/>
                            </Typography>
                            <Button
                                sx={{ml:"18%"}}
                                variant="outlined"
                            >
                                <Link
                                    to={`/login`}
                                    style={{textDecoration: 'none'}}
                                    state={{formType: "Log In" }}
                                >
                                    Log In / Sign Up
                                </Link>
                            </Button>
                        </Typography>
                        <hr/>
                    </MenuItem>
                )}
            <MenuItem>
                My profile
                <hr/>
            </MenuItem>
            {isAdmin && (
                <MenuItem>
                    <Link to="/product/create" style={{textDecoration: "none"}}>
                        Add product
                    </Link>
                </MenuItem>
            )}
            {isAdmin && (
                <MenuItem>
                    <Link to="/category/create" style={{textDecoration: "none"}}>
                        Add category
                    </Link>
                </MenuItem>
            )}
            {loggedIn && (
                <MenuItem>
                    <Button
                        variant="outlined"
                        onClick={handleLogoutAction}
                    >
                        Log out
                    </Button>
                </MenuItem>
            )}
            </Menu>
        </>
    )
}

export const Cart = (props: IUserInfo) => {
    const cartInfo =  useAppSelector(state => state.cart)
    const {userInfo} = props
    let cartCount = 0
    if(Object.keys(cartInfo)?.length && userInfo) {
        cartCount = (cartInfo[userInfo.email]) ? cartInfo[userInfo.email].length : 0
    }

    return (
        <IconButton aria-label="cart">
            <StyledBadge badgeContent={cartCount} color="secondary">
                {getIcons.cart}
            </StyledBadge>
        </IconButton>
    )
}

export const Wishlist = (props: IUserInfo) => {
    const wishListInfo =  useAppSelector(state => state.wishList)
    const {userInfo}  = props
    let wishListCount = 0
    if(Object.keys(wishListInfo).length && userInfo) {
        wishListCount = (wishListInfo[userInfo.email]) ? wishListInfo[userInfo.email].length : 0
    }

    return (
        <IconButton aria-label="cart">
            <StyledBadge badgeContent={wishListCount} color="secondary">
                {getIcons.wishList}
            </StyledBadge>
        </IconButton>
    )
}