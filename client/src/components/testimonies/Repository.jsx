import { Box, Button, Container, Typography } from '@mui/material'

import slider1 from '../../assets/slider/slider1.png'
import slider2 from '../../assets/slider/slider2.png'
import slider3 from '../../assets/slider/slider3.png'
import slider4 from '../../assets/slider/slider4.png'
import slider5 from '../../assets/slider/slider5.png'

import React from 'react'
import { Link } from 'react-router-dom'

const Repository = () => {
  return (
    <Container>
      <Box className='slider-repository' mt={10} mb={10}>
        <Box className='image-container'>
          <img src={slider1} />
          <Box className='overlay'>
          <Typography className='overlay-text' variant='h3' mb={20} color='primary'>Texto 1</Typography>
            <Link>
              <Button sx={{mb:2}} variant="contained">Ver más</Button>
            </Link>
          </Box>
        </Box>
        <Box className='image-container'>
          <img src={slider2} />
          <Box className='overlay'>
          <Typography className='overlay-text' variant='h3' mb={20} color='primary'>Texto 1</Typography>
            <Link>
              <Button sx={{mb:2}} variant="contained">Ver más</Button>
            </Link>
          </Box>
        </Box>
        <Box className='image-container'>
          <img src={slider3} />
          <Box className='overlay'>
          <Typography className='overlay-text' variant='h3' mb={20} color='primary'>Texto 1</Typography>
            <Link>
              <Button  sx={{mb:2}}variant="contained">Ver más</Button>
            </Link>
          </Box>
        </Box>
        <Box className='image-container'>
          <img src={slider4} />
          <Box className='overlay'>
          <Typography className='overlay-text' variant='h3' mb={20} color='primary'>Texto 1</Typography>
            <Link>
              <Button sx={{mb:2}} variant="contained">Ver más</Button>
            </Link>
          </Box>
        </Box>
        <Box className='image-container'>
          <img src={slider5} />
          <Box className='overlay'>
          <Typography className='overlay-text' variant='h3' mb={20} color='primary'>Texto 1</Typography>
            <Link>
              <Button sx={{mb:2}} variant="contained">Ver más</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Repository