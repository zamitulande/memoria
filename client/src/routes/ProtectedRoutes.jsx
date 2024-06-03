import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoutes({ redirectTo = "/", children }) {

    const login = useSelector((state) => state.user.login);
    console.log(login)
    if (!login) {
        return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet />
}