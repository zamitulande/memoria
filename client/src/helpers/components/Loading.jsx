import { Box, LinearProgress, Typography } from '@mui/material';


const Loading = ({ isLoading, uploadPercentage }) => {
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
