import { Box, Button, Container, Grid, List, ListItem, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import image1 from "../../assets/cards/1.jpeg";
import image4 from "../../assets/cards/4.jpeg";
import image3 from "../../assets/cards/3.jpeg";
import image5 from "../../assets/cards/5.jpeg";
import image6 from "../../assets/cards/6.jpeg";
import slider1 from "../../assets/home/slider1.png"
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <Container maxWidth="xl">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide><img src={image1} width="100%" alt="Imagen 1" /></SwiperSlide>
        <SwiperSlide><img src={image4} width="100%" alt="Imagen 4" /></SwiperSlide>
        <SwiperSlide><img src={image3} width="100%" alt="Imagen 3" /></SwiperSlide>
        <SwiperSlide><img src={image5} width="100%" alt="Imagen 5" /></SwiperSlide>
        <SwiperSlide><img src={image6} width="100%" alt="Imagen 6" /></SwiperSlide>
      </Swiper>
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* Barra inclinada */}
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
              ¿Cómo recuperar y preservar la memoria en nuestra sociedad?
            </Typography>
            <Typography component="p">
              En Colombia tenemos una memoria enriquecedora y más en el departamento del Cauca,
              la plataforma tecnológica Memoria Oral, busca la recuperación y preservación
              de la memoria sobre...
              <Typography fontWeight="bold" component="span">
                Conflicto armado, Covid 19, Cultura, Patrimonio alimentario, Conflicto social.
              </Typography>
              En nuestro repositorio encontrara los módulos con cada una de las temáticas y testimonios que dan vida a la memoria.
            </Typography>
            <Link to={'repositorio'}>
              <Button variant="contained">Ir a repositorio</Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={12} md={6} textAlign="center">
            <img src={slider1} width="60%" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
