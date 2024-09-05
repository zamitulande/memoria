import { Alert, AlertTitle, Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import Information from './Information'

const OpenaData = () => {
  return (
    <>
    <Container maxWidth="xl">
      <Alert severity="info" sx={{fontSize:14, marginBottom:2}}>
        <AlertTitle>Bienvenido al sistema de investigación</AlertTitle>
        el modulo de datos abiertos proporciona la opción de
        promover la investigación de los testimonios y la
        obtención de estadísticas respecto a la información
        de los datos almacenados en la plataforma Memoria Oral, esta iniciativa tiene por objetivo promover y habilitar las
        condiciones para la apertura, uso y generación de valor a partir de
        datos abiertos de la plataforma Memoria Oral.

        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}><Typography variant='h6'>Datos abiertos</Typography></Box>
        <Grid container spacing={2} justifyContent='space-around'>
          <Grid item xs={12} md={6}>
            <Typography>¿Qué son datos abiertos?</Typography>
            <Typography variant='spam'>Los datos abiertos son información pública dispuesta
              en formatos que permiten su uso y reutilización bajo licencia
              abierta y sin restricciones legales para su aprovechamiento.
              En Colombia, la Ley 1712 de 2014 sobre Transparencia y Acceso
              a la Información Pública Nacional, define los datos abiertos
              en el numeral sexto como "todos aquellos datos primarios o sin
              procesar, que se encuentran en formatos estándar e interoperables
              que facilitan su acceso y reutilización, los cuales están bajo la
              custodia de las entidades públicas o privadas que cumplen con funciones
              públicas y que son puestos a disposición de cualquier ciudadano, de
              forma libre y sin restricciones, con el fin de que terceros puedan
              reutilizarlos y crear servicios derivados de los mismos".</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography mb={-2}>¿ Objetivos del por qué Datos  abiertos?</Typography>
            <ul>
              <li>Promover la apertura, el uso y el aprovechamiento de los datos abiertos en sectores estratégicos para la innovación en la generación de soluciones a problemas públicos y sociales</li>
              <li>Fortalecer el ecosistema de datos abiertos involucrando actores estratégicos de diferentes sectores tales como: Academia, periodistas, desarrolladores, industria y sociedad civil.</li>
              <li>Desarrollar estrategias de difusión y promoción de la iniciativa con el fin de que la ciudadanía tenga una mayor comprensión de los datos abiertos y sus beneficios de uso y aprovechamiento.</li>
            </ul>
          </Grid>
        </Grid>
      </Alert>
      </Container>
      <Information/>
      </>
  )
}

export default OpenaData