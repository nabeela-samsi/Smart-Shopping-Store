import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/reduxHook';
import { getAllProducts } from '../redux/methods/productMethods';

import { Box } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { Logo, SearchBar, NavigationBar } from './HeaderItems';

const Header = () => {
    const dispatch = useAppDispatch()
    // const {isDarkTheme, toggleTheme} = useContext(ThemeContext)
    const {pathname} = useLocation()
    const [isForm, setIsForm] = useState(false)

    useEffect(() => {
        if(pathname.includes("login") || pathname.includes("signup")){
            setIsForm(true)
        } else {
            setIsForm(false)
        }
    },[pathname])

    useEffect(() => {
        dispatch(getAllProducts())
    },[dispatch])

    return (
        <header >
            { isForm ?
                <Box sx={{ display: "flex",alignItems:"center", columnGap:'2%', justifyContent:"center", p:1, m:1}}>
                    <Logo />
                </Box>
            :
            (<Box sx={{ display: "flex", flexDirection:"row", alignItems:"center", columnGap:'2%', justifyContent:"center", p:1, m:1}}>
                <Logo />
                <SearchBar />
                <NavigationBar />
            </Box>)}
            <br />
            <br />
        </header>
    )
}

export default Header