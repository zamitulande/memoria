import React from 'react'
import FormUser from './formData/FormUser'
import { Container, Typography } from '@mui/material'

const Update = () => {
    return (
        <Container sx={{mt:4}}>
        <Typography mb={4} variant="h5">Edicion de Usuario</Typography>
        <FormUser action="update"/>
      </Container>
    )
}

export default Update