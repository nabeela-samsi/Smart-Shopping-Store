import router from "./router/router"
import { RouterProvider } from "react-router-dom"

import { ThemeProvider } from "@mui/material"

import "./compiled/styles.css"
import { appTheme } from "./muistyles/appTheme"
import { useAppDispatch } from "./hooks/reduxHook"
import { useEffect } from "react"
import { getAllUsers } from "./redux/methods/userMethods"

const App = () => {
  const dispatch = useAppDispatch()

    useEffect(() => {
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