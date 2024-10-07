import { Card, Container, Grid, Button, CardActionArea, CardActions, Typography, CardMedia, CardContent, Box, Alert } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import slider1 from '../../assets/slider/slider1.jpg'
import slider2 from '../../assets/slider/slider2.jpg'
import slider3 from '../../assets/slider/slider3.jpg'
import slider4 from '../../assets/slider/slider4.jpg'
import slider5 from '../../assets/slider/slider5.jpg'
import { animateScroll } from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../redux/features/TestimonySlice';
import { useEffect } from 'react';

const Repository = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useSelector((state) => state.user.login)
  const role = useSelector((state) => state.user.role)

  const handleRegisterAdmin = () => {
    navigate('/usuarios/registrar');
  }

  const handleRegisterUser = () => {
    navigate('/repositorio/registrar');
  }

  useEffect(() => {
    animateScroll.scrollToTop();
  }, [])

  const images = [
    { src: slider1, title: "Conflicto armado", category: "conflicto-armado" },
    { src: slider2, title: "Pandemia", category: "pandemia" },
    { src: slider3, title: "Conflicto social", category: "conflicto-social" },
    { src: slider4, title: "Cultura", category: "cultura" },
    { src: slider5, title: "Patrimonio alimentario", category: "patrimonio-alimentario" }
  ];

  let message = "";

  if (login == true && role == "ADMIN") {
    message = <Grid container spacing={1} justifyContent="space-evenly" mb={2}>
      <Grid item>
        <Alert severity="info">A continuación puede registrar el testimonio, debera tener los datos de la persona que da el testimonio.</Alert>
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" size="large" onClick={handleRegisterAdmin} >
          <span>Registrar Testimonio</span>
        </Button>
      </Grid>
    </Grid>
  } else if (login == true && role == "USER") {
    message = <Grid container spacing={1} justifyContent="space-evenly" mb={2}>
      <Grid item>
        <Alert severity="info">A continuación puede registrar su testimonio, para que su testimonio sea publico debera esperar la autorización del adminstrador.</Alert>
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" size="large" onClick={handleRegisterUser}>
          <span>Registrar Testimonio</span>
        </Button>
      </Grid>
    </Grid>
  }

  const handleSelectCategory = (category) => {
    navigate(`/repositorio/${category}`);
    dispatch(setCategories(category));
  }

  return (
    <>
      {/* Barra que ocupa todo el ancho */}
      <Box
        sx={{
          position: 'absolute', 
          top: '50%', 
          left: -10,
          width: '140vw', 
          height: '400px',
          backgroundColor: 'primary.main',
          transform: 'translateY(-10%) rotate(25deg)', 
          zIndex: 0 
        }}
      />
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        {message}
        <Grid container spacing={0.5} mb={6}>
          {images.map((image, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={2.4}>
              <Box
                sx={{
                  display: 'flex',
                  position: 'relative',  
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease, border 0.4s ease',
                  border: '2px solid transparent',
                  borderRadius: '12px',
                  overflow: 'hidden',  
                  '&:hover': {
                    transform: 'scale(1.07)',
                    boxShadow: '0px 10px 24px rgba(0, 0, 0, 0.15)',
                    border: '2px solid #1976d2',
                    '& .imageTitle': {  
                      opacity: 1,
                      transform: 'translateY(0)', 
                    }
                  }
                }}

                onClick={() => handleSelectCategory(image.category)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  style={{
                    height: 395,
                    width: '100%',
                    objectFit: 'contain'
                  }}
                />
                <Typography
                  variant="h6"
                  component="p"
                  className="imageTitle"  
                  sx={{
                    position: 'absolute',
                    bottom: 0,  
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',  
                    color: '#fff',
                    textAlign: 'center',
                    padding: '10px',
                    opacity: 0,  
                    transition: 'opacity 0.3s ease, transform 0.3s ease', 
                    transform: 'translateY(100%)',  
                  }}
                >
                  {image.title}
                </Typography>

              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Repository