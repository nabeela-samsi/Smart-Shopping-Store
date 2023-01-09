import { useEffect } from "react"
import router from "./router/router"
import { RouterProvider, useLocation } from "react-router-dom"

import { ThemeProvider } from "@mui/material"

import "./compiled/styles.css"
import { appTheme } from "./utilities/appTheme"

import { useAppDispatch } from "./hooks/reduxHook"

import { getAllCategories } from "./redux/methods/categoryMethods"
import { getAllProducts } from "./redux/methods/productMethods"
import { getAllUsers } from "./redux/methods/userMethods"

const App = () => {
  const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllProducts())
        dispatch(getAllUsers())
    },[dispatch])
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App