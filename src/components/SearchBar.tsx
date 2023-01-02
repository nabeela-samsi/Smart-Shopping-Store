import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material"

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("")
    const navigate = useNavigate()
    const getLocation = useLocation().search
    let navigateURL = `/products/searchByProductName?name=${inputValue}`

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
    )
}

export default SearchBar