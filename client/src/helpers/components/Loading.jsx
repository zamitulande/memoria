import { Box, LinearProgress, Typography } from '@mui/material';


const formatTime = (seconds) => {
    if (seconds >= 3600) {
        // Si es más de 1 hora, muestra horas y minutos
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}horas ${minutes}minutos restantes`;
    } else if (seconds >= 60) {
        // Si es más de 1 minuto, muestra minutos
        const minutes = Math.floor(seconds / 60);
        return `${minutes}minutos restantes`;
    } else {
        // Si es menos de un minuto, muestra segundos
        return `${Math.floor(seconds)}segundos restantes`;
    }
};

const Loading = ({ isLoading, uploadPercentage, estimatedTime }) => {
    return (
        isLoading && (
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }}
            >
                <Typography
                    variant="body1"
                    align="center"
                    sx={{ color: '#fff', marginBottom: 2 }}
                >
                    Subiendo testimonio... {uploadPercentage}%
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ color: '#fff', marginBottom: 2 }}
                >
                    {formatTime(estimatedTime)}
                </Typography>
                <Box
                    sx={{
                        width: '80%', 
                        maxWidth: '300px', 
                    }}
                >
                    <LinearProgress
                        variant="determinate"
                        value={uploadPercentage}
                        sx={{
                            height: '25px',
                            borderRadius: '4px', 
                            backgroundColor: '#f3f3f3',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: 'primary.main' 
                            }
                        }}
                    />
                </Box>
            </Box>
        )
    );
};

export default Loading;
