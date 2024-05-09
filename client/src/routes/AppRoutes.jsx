import { Route, Routes } from "react-router-dom"
import Home from "../components/home/Home"
import AbautUs from "../components/abautUs/AbautUs"
import OpenData from "../components/openData/OpenData"
import Users from "../components/users/Users"
import Register from "../components/users/Register"
import Testimonies from "../components/testimonies/Testimonies"
import ActivateAccount from "../auth/ActivateAccount"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/nosotros' element={<AbautUs/>} />
        <Route path='/testimonios' element={<Testimonies/>} />
        <Route path='/datos-abiertos' element={<OpenData/>} />
        <Route path='/usuarios' element={<Users/>} />
        <Route path='/usuarios/registrar' element={<Register/>}/>
        <Route path='/activate-account' element={<ActivateAccount/>}/>
    </Routes>
  )
}

export default AppRoutes