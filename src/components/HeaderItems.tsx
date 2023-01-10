import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { IconButton, InputAdornment, TextField } from "@mui/material"
import { Stack } from "@mui/system";

import { Cart, MenuBar, ModeToggle, Wishlist } from "./NavItems";

import getIcons from "../utilities/getIcon";
import { useAppSelector } from "../hooks/reduxHook";
import { IUser } from "../type/User";

export const Logo = () => {
    return (
        <div className="header__logo">
            <Link to={"/"}>
                <img src="/logo.svg" alt="Brand Logo" width={200} />
            </Link>
        </div>
    )
}

export const SearchBar = () => {
    const [inputValue, setInputValue] = useState("")
    const navigate = useNavigate()
    const getLocation = useLocation().search
    let navigateURL = `/products/searchByProductName?name=${inputValue}`

    useEffect(() => {
        const productName = new URLSearchParams(getLocation).get("name")
        if (productName && productName.trim().length > 0) {
            setInputValue(productName)
        }
    }, [getLocation])

    const handleOnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            navigate(navigateURL)
        }
    }

    return (
        <div className="header__query">
            <TextField
                placeholder="search for products"
                fullWidth
                color="primary"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={handleOnKeyPress}
                InputProps={{
                    style: { width: "45vw" },
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton>
                                <Link to={navigateURL}>
                                    {getIcons.search}
                                </Link>
                            </IconButton >
                        </InputAdornment>
                    )
                }}
            />
        </div>
    )
}

export const NavigationBar = () => {
    const { loggedIn, userInfo } = useAppSelector((state) => state.auth)
    const isAdmin = userInfo?.role.toLowerCase() === 'admin'
    return (
        <Stack direction="row" spacing={3} className="header__action">
            <MenuBar
                loggedIn={loggedIn}
                isAdmin={isAdmin}
                userName={(userInfo) ? userInfo.name : ''}
                userImage={(userInfo) ? userInfo.avatar : ''}
                userId={(userInfo) ? userInfo.id : 0}
            />
            <Link to={"/products"} className="link-nodecoration">
                <IconButton>
                    Products
                </IconButton>
            </Link>
            <Link to={loggedIn ? "/cart" : "/login"}>
                <Cart
                    userInfo={userInfo as IUser}
                />
            </Link>
            <Link to={loggedIn ? "/wishlist" : "/login"}>
                <Wishlist
                    userInfo={userInfo as IUser}
                />
            </Link>
            <ModeToggle
            />
        </Stack>
    )
}