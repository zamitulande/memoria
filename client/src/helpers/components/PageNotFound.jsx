import { Alert, Container, Grid, Typography } from '@mui/material'
import React from 'react'

const PageNotFound = () => {
  return (
   <Container maxWidth='xl'>
         <Grid container alignItems='center'>
            <Grid item md={6} sx={{ display: { xs: 'none', md: 'flex' }}} >
                <Typography borderBottom={5} fontSize='21rem' variant='h1' margin={0} color='primary'>404</Typography>
            </Grid>
            <Grid item md={6} >
            <Typography fontSize={60} color='primary'>Elemento no localizado</Typography>
                <Alert severity="warning">
                El elemento o la página que está buscando no se ha logrado localizar, 
                esto puede ocurrir porque nunca existió en el sistema o porque el nombre 
                del recurso ha sido editado.
                </Alert>
            </Grid> 
        </Grid>
   </Container>
  )
}

export default PageNotFound