import { Container, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import FormTestimony from './FormTestimony'

const RegisterTestimony = () => {
    const userId = useSelector((state) => state.user.userId)
    console.log(userId)
  return (
    <Container sx={{mt:4}}>
      <Typography mb={4} variant="h5">Registro de testimonio</Typography>
      <FormTestimony action="register" userId={userId}/>
    </Container>
  )
}

export default RegisterTestimony