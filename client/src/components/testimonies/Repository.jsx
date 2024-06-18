import { Card, Container, Grid, Button, CardActionArea, CardActions, Typography, CardMedia, CardContent, Box } from '@mui/material'
import { Link } from 'react-router-dom';
import slider1 from '../../assets/slider/slider1.png'
import slider2 from '../../assets/slider/slider2.png'
import slider3 from '../../assets/slider/slider3.png'
import slider4 from '../../assets/slider/slider4.png'
import slider5 from '../../assets/slider/slider5.png'
import LoadingGif from '../../assets/loading/loading.gif'
import { useEffect, useState } from 'react';

const Repository = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(!isLoading)
    },2000)
  }, [])

  const images = [
    { src: slider1, title: "Conflicto armado", description: "Vivencias en los territorios con el flagelo de la guerra. ", link: "/page1" },
    { src: slider2, title: "Covid 19", description: "Superacion y resignación durante la pandemia.", link: "/page2" },
    { src: slider3, title: "Gastronomia", description: "Sabores, olores y la cocina tipica de Colombia.", link: "/page3" },
    { src: slider4, title: "Turismo", description: "Lugares para descubrir y recordar.", link: "/page4" },
    { src: slider5, title: "Mitos y leyendas", description: "Cuentos ancestrales llenos de suspenso.", link: "/page5" },
    { src: slider1, title: "Artesanos", description: "Historias contadas en sus manos.", link: "/page5" }
  ];
  return (
    <Container>
      <Grid container spacing={1} mt={4} mb={6}>
        {images.map((image, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
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
                  height="200"
                  image={image.src}
                  alt={image.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {image.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {image.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to={image.link}>
                  <Button size="small" color="secondary" >
                    Ver más
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {
                isLoading && (
                    <Box className="loading-overlay">
                        <img src={LoadingGif} alt="Loading..." />
                    </Box>
                )
            }
    </Container>
  )
}

export default Repository