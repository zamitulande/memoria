import { Box, Container, Grid, Typography } from '@mui/material'
import image1Webp from "../../assets/home/us.webp";
import image4Webp from "../../assets/cards/4.webp";
import image4Jpeg from "../../assets/cards/4.jpeg";
import Image from 'react-image-webp';
import React from 'react'

const Nosotros = () => {
  return (
    <Container>
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '-20%',
            width: '200%',
            height: '350px',
            backgroundColor: 'primary.main',
            transform: 'rotate(20deg)',
            zIndex: 0, // para que esté detrás del contenido
          }}
        />
        <Grid container alignItems="center" spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
          <Grid item xs={12} sm={12} md={6} justifyContent="center">
            <Typography fontWeight="bold" fontSize={30} borderColor="primary" borderBottom={2}>
              Misión
            </Typography>
            <Typography component="p">
              La plataforma Memoria Oral, administra archivos en formato video, audio y escrito,
              para la generación de conocimiento y preservación de la memoria del mundo;
              se desarrolla módulos a través de las buenas prácticas dentro del contexto
              de nuevos cambios tecnológicos, con diferenciados tipos de información:
              conflicto social, salud, cultura, conflicto armado y patrimonio alimentario.
              Dirigida a las comunidades científicas, tecnológicas y académicas. Es una herramienta
              interactiva que permite la permanente comunicación con
              el usuario para impactar una interrelación tecnológica y de conocimiento
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} justifyContent="center">
            <Image
              webp={image1Webp}
              width="100%"
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            position: 'absolute',
            top: 500,
            left: '-50%',
            width: '200%',
            height: '350px',
            backgroundColor: 'primary.main',
            transform: 'rotate(160deg)',
            zIndex: 0, // para que esté detrás del contenido
          }}
        />
        <Grid mt={5} container alignItems="center" spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
          <Grid item xs={12} sm={12} md={6} textAlign="center">
            <Image
             src={image4Jpeg}
             webp={image4Webp}
              width="100%"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} justifyContent="center">
            <Typography fontWeight="bold" fontSize={30} borderColor="primary" borderBottom={2}>
              Visión
            </Typography>
            <Typography component="p">
              Dentro de cinco años se pretende una plataforma de Memoria Oral,
              robusta que responda al volumen de tráfico y demandas de tecnologías
              existentes, para procesar información oral y escrita de forma estructurada y
              detallada, el aplicativo Web propiciara interacción permanente con el
              usuario de las comunidades científicas, tecnológicas y académicas tanto nacionales e
              internacionales interesadas en preservar el patrimonio oral y escrito.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Nosotros