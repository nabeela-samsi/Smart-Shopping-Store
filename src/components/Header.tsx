import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Stack } from '@mui/system';
import { useAppDispatch } from '../hooks/reduxHook';
import { getAllProducts } from '../redux/methods/productMethods';
import { Logo, SearchBar, NavigationBar } from './HeaderItems';

const Header = () => {
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const [isForm, setIsForm] = useState(false)
    useEffect(() => {
        if (pathname.includes("login") || pathname.includes("signup") || pathname.includes("userprofile")) {
            setIsForm(true)
        } else {
            setIsForm(false)
        }
    }, [pathname])
    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])
    return (
        <header>
            <Stack
                direction={"row"}
                spacing={5}
                alignItems={"center"}
                justifyContent={"center"}
                padding={3}
            >
                {isForm
                    ?
                    <Logo />
                    :
                    <>
                        <Logo />
                        <SearchBar />
                        <NavigationBar />
                    </>
                }
            </Stack>
        </header>
    )
}

export default Header