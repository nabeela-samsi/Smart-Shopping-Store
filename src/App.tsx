import { useEffect } from "react"
import router from "./router/router"
import { RouterProvider } from "react-router-dom"
import { CssBaseline, ThemeProvider } from "@mui/material"
import "./compiled/styles.css"
import { useAppDispatch, useAppSelector } from "./hooks/reduxHook"
import { getAllUsers } from "./redux/methods/userMethods"
import { AppTheme } from "./muistyles/AppTheme"

const App = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.theme)
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  const apptheme = AppTheme(theme)
  return (
    <>
      <ThemeProvider theme={apptheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App