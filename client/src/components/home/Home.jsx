import { Container } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import image1 from "../../assets/cards/1.jpeg";
import image4 from "../../assets/cards/4.jpeg";
import image3 from "../../assets/cards/3.jpeg";
import image5 from "../../assets/cards/5.jpeg";
import image6 from "../../assets/cards/6.jpeg";

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
    </Container>
  );
};

export default Home;
