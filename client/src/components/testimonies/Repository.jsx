import { Card, Container, Grid, Button, CardActionArea, CardActions, Typography, CardMedia, CardContent, Box, Alert } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import slider1 from '../../assets/slider/slider1.png'
import slider2 from '../../assets/slider/slider2.png'
import slider3 from '../../assets/slider/slider3.png'
import slider4 from '../../assets/slider/slider4.png'
import slider5 from '../../assets/slider/slider5.png'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../redux/features/TestimonySlice';

const Repository = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const login = useSelector((state) => state.user.login)
  const role = useSelector((state) => state.user.role)

  const handleRegisterAdmin = () => {
    navigate('/usuarios/registrar');
  }

  const handleRegisterUser = () => {
    navigate('/repositorio/registrar');
  }

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
    <Container>
      {message}
      <Grid container spacing={2} mb={6}>
        {images.map((image, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={2.4}>
            <Card sx={{
              boxShadow: 8,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6
              }
            }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={image.src}
                  alt={image.title}
                />
                <CardContent style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  color: '#fff',
                }}>
                  <Typography variant="h6" component="div">
                    {image.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="secondary" variant="contained" onClick={() => handleSelectCategory(image.category)}>
                    Ver más
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>

  )
}

export default Repository