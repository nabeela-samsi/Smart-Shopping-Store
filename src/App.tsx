import { ThemeProvider, createTheme, makeStyles } from "@mui/material"
import "./compiled/styles.css"

import router from "./router/router"
import { RouterProvider } from "react-router-dom"

const App = () => {
  const defaultTheme = createTheme({
      typography:{
        button: {
          textTransform: "none"
        }
      }
  })
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={router} />
        </ThemeProvider>
    </>
  )
}

export default App