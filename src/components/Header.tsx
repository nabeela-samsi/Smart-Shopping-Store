import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/reduxHook';
import { getAllProducts } from '../redux/reducers/productReducer';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import Brightness4SharpIcon from '@mui/icons-material/Brightness4Sharp';
import {Box, IconButton } from "@mui/material";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const getLocation = useLocation().search
    const dispatch = useAppDispatch()
    const [inputValue, setInputValue] = useState("")
    const navigate = useNavigate()
    let navigateURL = `/products/searchByProductName?name=${inputValue}`
    // const {isDarkTheme, toggleTheme} = useContext(ThemeContext)

    useEffect(() => {
        dispatch(getAllProducts())
    },[dispatch])

    useEffect(()=>{
        const productName = new URLSearchParams(getLocation).get("name")
        if(productName && productName.trim().length > 0) {
            setInputValue(productName)
        }
    },[])

    const handleOnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if(e.key === 'Enter') {
            navigate(navigateURL)
        }
    }
    return (
        <header>
            <Box sx={{ display: "flex", flexDirection:"row", alignItems:"center", columnGap:'2%', justifyContent:"center", p:1, m:1}}>
                <div className="header__logo">
                    <img src="/logo.svg" alt="Brand Logo" width={200}/>
                </div>
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
                <div className="header__action">
                    <PersonOutlineTwoToneIcon color="info" fontSize="large" sx={{mr: "1em"}}/>
                    <ShoppingCartTwoToneIcon color="info" fontSize="large" sx={{mr: "1em"}}/>
                    <FavoriteTwoToneIcon color="info" fontSize="large" sx={{mr: "1em"}}/>
                    <Brightness4SharpIcon fontSize="large" sx={{mr: "1em"}} />
                </div>
            </Box>
        </header>
    )
}

export default Header