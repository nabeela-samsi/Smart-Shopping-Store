import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { CartIcon, MenuBar, WishlistIcon } from "./NavItems";

export const Logo = () => {
    return (
        <div className="header__logo">
            <Link to={"/"}>
                <img src="/logo.svg" alt="Brand Logo" width={200}/>
            </Link>
        </div>
    )
}

export const SearchBar = () => {
    const [inputValue, setInputValue] = useState("")
    const navigate = useNavigate()
    const getLocation = useLocation().search
    let navigateURL = `/products/searchByProductName?name=${inputValue}`

    useEffect(()=>{
        const productName = new URLSearchParams(getLocation).get("name")
        if(productName && productName.trim().length > 0) {
            setInputValue(productName)
        }
    },[getLocation])

    const handleOnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if(e.key === 'Enter') {
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
                    style:{width:"45vw"},
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton>
                                <Link to={navigateURL}>
                                    <SearchIcon />
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
    return (
        <div className="header__action">
            <MenuBar />
            <CartIcon />
            <WishlistIcon />
        </div>
    )
}