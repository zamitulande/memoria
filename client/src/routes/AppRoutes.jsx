import { Route, Routes } from "react-router-dom"
import Home from "../components/home/Home"
import AbautUs from "../components/abautUs/AbautUs"
import OpenData from "../components/openData/OpenData"
import Users from "../components/users/Users"
import Register from "../components/users/Register"
import ActivateAccount from "../auth/ActivateAccount"
import ForgetPassword from "../auth/ForgetPassword"
import ResetPassword from "../auth/ResetPassword"
import Collaborate from "../components/collaborate/Collaborate"
import ProtectedRoutes from "./ProtectedRoutes"
import Repository from "../components/testimonies/Repository"
import Update from "../components/users/Update"
import RegisterTestimony from "../components/testimonies/registerTestimomy/RegisterTestimony"
import Testimony from "../components/testimonies/Testimony"
import { useSelector } from "react-redux"

const AppRoutes = () => {
  const category = useSelector((state) => state.testimony.category);
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/nosotros' element={<AbautUs />} />
      <Route path='/repositorio' element={<Repository />} />
      <Route path='/datos-abiertos' element={<OpenData />} />
      <Route
        path='/usuarios'
        element={<ProtectedRoutes redirectTo="/">
          <Users />
        </ProtectedRoutes>} />
      <Route path='/usuarios/registrar' element={<Register />} />
      <Route
        path='/usuarios/editar'
        element={<ProtectedRoutes redirectTo="/">
          <Update />
        </ProtectedRoutes>} />
      <Route path='/activate-account' element={<ActivateAccount />} />
      <Route path='/forget-password' element={<ForgetPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/colaboraciones' element={<Collaborate />} />
      {/* <Route path='/repositorio/registrar' element={<RegisterTestimony/>}/> */}
      <Route
        path='/repositorio/registrar'
        element={<ProtectedRoutes redirectTo="/">
          <RegisterTestimony />
        </ProtectedRoutes>} />
        {category ? (
           <Route path={`/repositorio/${category}`}  element={<Testimony />} />
        ): null}
    </Routes>
  )
}

export default AppRoutes