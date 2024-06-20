import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { ThemeProvider } from "@emotion/react"
import { getTheme } from "./config/Theme"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import InfoRegister from "./helpers/components/InfoRegister"

function App() {

  return (
    <ThemeProvider theme={getTheme}>
      <BrowserRouter>
        <Header/>
        <AppRoutes />
        <Footer/>
        <InfoRegister/>
      </BrowserRouter>
      
    </ThemeProvider>
  )
}

export default App
