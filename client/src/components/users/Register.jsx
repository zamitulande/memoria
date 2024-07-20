import { Alert, AlertTitle, Container, Typography } from "@mui/material"
import FormUser from "./formData/FormUser"
import { useSelector } from "react-redux"

const Register = () => {
  const role = useSelector((state) => state.user.role)
  return (
    <Container sx={{mt:4}}>
      <Alert sx={{mb:2}} icon={false} severity="info"><AlertTitle> Registro de Usuarios.</AlertTitle></Alert>
      <FormUser action="register" role={role}/>
    </Container>
  )
}

export default Register