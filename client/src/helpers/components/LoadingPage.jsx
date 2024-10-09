import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import SennovaLogoPng from '../../assets/loading/sennova-logo.png'
import SennovaLogoWebp from '../../assets/loading/sennova-logo.webp'
import Image from 'react-image-webp';

const SplashScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const firstTime = localStorage.getItem('firstTime') === null;

        if (firstTime) {
            localStorage.setItem('firstTime', 'false');
            const timer = setTimeout(() => {
                setLoading(false);
            }, 10000);
            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, []);

    if (!loading) {
        return null; 
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#fff',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Image
              src={SennovaLogoPng}
              webp={SennovaLogoWebp}
              width="100%"
            />       
            <Typography variant="h6" mt={2}>
                Cargando, por favor espera...
            </Typography>
            <Typography variant="body1" mt={1}>
                Esto podría tardar hasta 10 segundos
            </Typography>
            <Typography variant="body1">
                si es tu primera visita.
            </Typography>
        </Box>
    );
};

export default SplashScreen;
