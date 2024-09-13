import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { ThemeProvider } from "@emotion/react"
import { getTheme } from "./config/Theme"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import InfoRegister from "./helpers/components/InfoRegister"
import { useSelector } from "react-redux"
import SplashScreen from "./helpers/components/LoadingPage"

function App() {

  const login = useSelector((state) => state.user.login)
  let InfoRegisterButton = "";
  if(!login){
    InfoRegisterButton = <InfoRegister/>
  }
  return (
    <ThemeProvider theme={getTheme}>
      <BrowserRouter>
      <SplashScreen />
        <Header/>
        <AppRoutes />
        <Footer/>
        {InfoRegisterButton}
      </BrowserRouter>
      
    </ThemeProvider>
  )
}

export default App
