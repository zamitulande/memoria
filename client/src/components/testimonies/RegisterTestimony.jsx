import { Alert, AlertTitle, Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import FormTestimony from './DataTestimomy/FormTestimony'

const RegisterTestimony = () => {

  const userId = useSelector((state) => state.user.userId)

  return (
    <Container sx={{ mt: 4 }}>
      <Alert sx={{ mb: 2 }} icon={false} severity="info"><AlertTitle>Registro de testimonio.</AlertTitle></Alert>
      <FormTestimony action="register" userId={userId} />
    </Container>
  )
}

export default RegisterTestimony