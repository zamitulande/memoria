import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { ThemeProvider } from "@emotion/react"
import { getTheme } from "./config/Theme"
import Header from "./components/header/Header"

function App() {

  return (
    <ThemeProvider theme={getTheme}>
      <BrowserRouter>
        <Header/>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
