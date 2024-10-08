import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import image1 from "../../assets/cards/1.jpeg";
import image4 from "../../assets/cards/4.jpeg";
import image3 from "../../assets/cards/3.jpeg";
import image5 from "../../assets/cards/5.jpeg";
import image6 from "../../assets/cards/6.jpeg";
import slider6 from "../../assets/home/slider6.gif"
import mapa from "../../assets/home/mapa-cauca.png"
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <Container>
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
      <Box mt={5} sx={{ position: 'relative', overflow: 'hidden' }}>
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
              de la memoria sobre... {" "}
              <Typography fontWeight="bold" component="span">
                Conflicto armado, Covid 19, Cultura, Patrimonio alimentario, Conflicto social.{" "}
              </Typography>
              En nuestro repositorio encontrara los módulos con cada una de las temáticas y testimonios que dan vida a la memoria.
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Link to={'repositorio'}>
                <Button variant="contained">Ir a repositorio</Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} justifyContent="center">
            <img src={slider6} width="100%" />
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
            <img src={mapa} width="60%" />
          </Grid>
          <Grid item xs={12} sm={12} md={6} justifyContent="center">
            <Typography fontWeight="bold" fontSize={30} borderColor="primary" borderBottom={2}>
              Escenario de violencia en el departamento del Cauca
            </Typography>
            <Typography component="p">
              El Cauca fue escenario de hechos de violencia en el marco del conflicto armado interno,
              el sometimiento a sangre y fuego de las comunidades que lo integran por parte de grupos
              guerrilleros y otros actores armados como las AUC y paramilitares, predominaron por décadas
              en la región. La disputa del poder y proyecto de expansión y acumulación territorial, provocó
              un intenso accionar como la confrontación armada entre los distintos bandos, y éstos con la
              fuerza pública, las tomas a los poblados y cabeceras municipales, arremetidas contra los puestos
              de policía, embocadas para reducir la presencia estatal y neutralizar la influencia del enemigo,
              además de algunos actos delictivos como la extorsión, el secuestro, y comercialización productos
              ilícitos (CNMH, TYAG1965-2013, 2016, pág. 28).
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
