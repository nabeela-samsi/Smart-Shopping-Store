import "./compiled/styles.css"

import Header from './components/Header'
import Home from './components/Home'
import Footer from "./components/Footer"
import { useState } from "react"
import ThemeModeProvider from "./components/ThemeModeContext"
import router from "./router/router"
import { RouterProvider } from "react-router-dom"

const App = () => {
  const [themeMode, setThemeMode] = useState("light")
  const value = {themeMode, setThemeMode}
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  )
}

export default App