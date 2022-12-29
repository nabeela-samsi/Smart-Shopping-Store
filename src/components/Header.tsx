import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import Brightness4SharpIcon from '@mui/icons-material/Brightness4Sharp';
import { Autocomplete, Box } from "@mui/material";
import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { getAllProducts } from '../redux/reducers/productReducer';
import { ThemeContext } from '@emotion/react';

const Header = () => {
    const dispatch = useAppDispatch()
    const products = useAppSelector(state => state.productReducer)
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
                    <TextField
                        placeholder="search for products"
                        fullWidth
                        color="primary"
                        InputProps={{
                            style:{width:"45vw"},
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
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