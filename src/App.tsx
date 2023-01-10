import router from "./router/router"
import { RouterProvider } from "react-router-dom"

import { ThemeProvider } from "@mui/material"

import "./compiled/styles.css"
import { appTheme } from "./MUi Styles/appTheme"

const App = () => {
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App