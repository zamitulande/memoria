import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { ThemeProvider } from "@emotion/react"
import { getTheme } from "./config/Theme"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

function App() {

  return (
    <ThemeProvider theme={getTheme}>
      <BrowserRouter>
        <Header/>
        <AppRoutes />
        <Footer/>
      </BrowserRouter>
      
    </ThemeProvider>
  )
}

export default App
