import { Container, Grid, Typography, useTheme, useMediaQuery, Chip, Box, Divider } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react'
import Image from 'react-image-webp';
import { Link } from 'react-router-dom';
import SenaPng from '../../assets/footer/sena.png'
import SennovaPng from '../../assets/footer/sennova.png'
import DocumentalPng from '../../assets/footer/gestion-documental.png'
import logoPng from '../../assets/footer/logo.png'
import SenaWebp from '../../assets/footer/sena.webp'
import SennovaWebp from '../../assets/footer/sennova.webp'
import DocumentalWebp from '../../assets/footer/gestion-documental.webp'
import logoWebp from '../../assets/footer/logo.webp'


const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const year = new Date().getFullYear();
    return (
        <>
            <Container sx={{ mt: 8 }}>
                <Grid container wrap="nowrap" spacing={2} direction={isMobile ? 'column' : 'row'}>
                    <Grid item xs={12} sm={4}>
                        <Image
                            src={logoPng}
                            webp={logoWebp}
                            height="150px"
                        />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Typography>
                            Sistema para la recuperación de la memoria oral de las víctimas del conflicto armado, Pandemia, Cultura, Conflicto social y Patrimonio alimentario en Colombia.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Contacto</Typography>
                        <Chip icon={<MailOutlineIcon />} label="memoriaoralsena@gmail.com" />
                        <Chip icon={<PhoneAndroidIcon />} label="+57 (2) 8205108 – 8205903 - Ext. 22408 - 22029" />
                        <Chip icon={<LocationOnIcon />} label="Calle 4 #2-80 - Popayán (Cauca)" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>
                            Navegación
                        </Typography>
                        <Box display="flex" flexDirection="column">
                            <Link style={{ textDecoration: 'none' }} to="/">Inicio</Link>
                            <Link style={{ textDecoration: 'none' }} to="nosotros">Nosotros</Link>
                            <Link style={{ textDecoration: 'none' }} to="repositorio">Repositorio</Link>
                            <Link style={{ textDecoration: 'none' }} to="colaboraciones">Colaboraciones</Link>
                            <Link style={{ textDecoration: 'none' }} to="datos-abiertos">Datos Abiertos</Link>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Divider ><Typography mb={5} color='secondary.main' fontSize={35}>Nuestros aliados</Typography></Divider>
            <Grid sx={{ backgroundColor: 'primary.main' }} container justifyContent="center" spacing={4}>
                <Grid item xs={12} sm={6} md={5} textAlign="center">
                    <Image
                        src={SennovaPng}
                        webp={SennovaWebp}
                        width='70%'
                    />
                </Grid>
                <Grid item xs={6} sm={3} md={2} textAlign="center">
                    <Image
                        src={SenaPng}
                        webp={SenaWebp}
                        width='80%'
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={5} textAlign="center">
                    <Image
                        src={DocumentalPng}
                        webp={DocumentalWebp}
                        width='80%'
                    />
                </Grid>
            </Grid>
            <Box
                sx={{
                    textAlign: 'center',
                    color: '#757575',
                }}
            >
                &copy; Copyright {year}, Sena - Cauca - Centro de Comercio y servicios.
            </Box>
        </>
    )
}

export default Footer