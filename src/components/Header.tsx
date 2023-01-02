import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/reduxHook';
import { getAllProducts } from '../redux/reducers/productReducer';

import { Box } from "@mui/material";
import SearchBar from './SearchBar';
import NavigationBar from './NavigationBar';

const Header = () => {
    const dispatch = useAppDispatch()
    // const {isDarkTheme, toggleTheme} = useContext(ThemeContext)

    useEffect(() => {
        dispatch(getAllProducts())
    },[dispatch])

    return (
        <header>
            <Box sx={{ display: "flex", flexDirection:"row", alignItems:"center", columnGap:'2%', justifyContent:"center", p:1, m:1}}>
                <div className="header__logo">
                    <img src="/logo.svg" alt="Brand Logo" width={200}/>
                </div>
                <div className="header__query">
                    <SearchBar />
                </div>
                <div className="header__action">
                    <NavigationBar />
                </div>
            </Box>
        </header>
    )
}

export default Header