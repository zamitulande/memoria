import { Container, Typography } from "@mui/material"
import FormUser from "./formData/FormUser"
import { useSelector } from "react-redux"

const Register = () => {
  const role = useSelector((state) => state.user.role)
  return (
    <Container sx={{mt:4}}>
      <Typography mb={4} variant="h5">Registro de Usuarios</Typography>
      <FormUser action="register" role={role}/>
    </Container>
  )
}

export default Register