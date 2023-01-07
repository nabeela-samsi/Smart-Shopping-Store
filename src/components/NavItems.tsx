import { useState } from "react";
import { userLogout } from "../redux/reducers/authReducers";
import { Link } from "react-router-dom";

import { Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"

import { StyledBadge } from "../utilities/styles";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import getIcons from "../utilities/getIcon";

export const MenuBar = () => {
    const loggedUser = useAppSelector(state => state.auth)
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
                {!loggedUser.loggedIn && (
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
                    </MenuItem>
                )}
                <MenuItem>
                    My profile
                </MenuItem>
            {loggedUser.loggedIn && (
                <MenuItem>
                    <Button
                        sx={{ml:"18%"}}
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

export const Cart = () => {
    const cartInfo =  useAppSelector(state => state.cart)
    const {userInfo}  = useAppSelector(state => state.auth)
    let cartCount = 0
    if(Object.keys(cartInfo).length && userInfo) {
        cartCount = cartInfo[userInfo.email].length
    }

    return (
        <IconButton aria-label="cart">
            <StyledBadge badgeContent={cartCount} color="secondary">
                {getIcons.cart}
            </StyledBadge>
        </IconButton>
    )
}

export const Wishlist = () => {
    const wishListInfo =  useAppSelector(state => state.wishList)
    const {userInfo}  = useAppSelector(state => state.auth)
    let wishListCount = 0
    if(Object.keys(wishListInfo).length && userInfo) {
        wishListCount = wishListInfo[userInfo.email].length
    }

    return (
        <IconButton aria-label="cart">
            <StyledBadge badgeContent={wishListCount} color="secondary">
                {getIcons.wishList}
            </StyledBadge>
        </IconButton>
    )
}