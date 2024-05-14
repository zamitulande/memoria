import { Container, Typography } from "@mui/material"
import FormUser from "./formData/FormUser"

const Register = () => {
  return (
    <Container sx={{mt:4}}>
      <Typography variant="h5">Registro de Usuarios</Typography>
      <FormUser action="register"/>
    </Container>
  )
}

export default Register