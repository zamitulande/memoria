import { Container, Grid, Typography, useTheme, useMediaQuery, Chip, Box, Divider } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react'
import { Link } from 'react-router-dom';


const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Container>
            <Grid container wrap="nowrap" spacing={2} direction={isMobile ? 'column' : 'row'}>
                <Grid item xs={12} sm={10}>
                    <Typography>
                        Sistema para la recuperación de la memoria oral de las víctimas del conflicto armado, Pandemia y Cultura en Colombia.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>Contacto</Typography>
                    <Chip icon={<MailOutlineIcon/>} label="memoriaoralsena@gmail.com"/>
                    <Chip icon={<PhoneAndroidIcon/>} label="+57 (2) 8205108 – 8205903 - Ext. 22408 - 22029"/>
                    <Chip icon={<LocationOnIcon/>} label="Calle 4 #2-80 - Popayán (Cauca)"/>                    
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography>
                        Navegación
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        <Link style={{textDecoration:'none'}} to="/">Inicio</Link>
                        <Link style={{textDecoration:'none'}} to="nosotros">Nosotros</Link>
                        <Link style={{textDecoration:'none'}} to="repositorio">Repositorio</Link>
                        <Link style={{textDecoration:'none'}} to="colaboraciones">Colaboraciones</Link>
                        <Link style={{textDecoration:'none'}} to="datos-abiertos">Datos Abiertos</Link>
                    </Box>
                </Grid>                
            </Grid>
            <Divider><Typography>Nuestros aliados</Typography></Divider>
        </Container>
    )
}

export default Footer