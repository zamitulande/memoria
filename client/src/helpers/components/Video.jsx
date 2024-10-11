import { Box } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import React, { useState } from 'react'

const Video = ({video}) => {

    const [isPlaying, setIsPlaying] = useState(false);

    const handleVideoPlayPause = (e) => {
        const video = e.target;
        if (!video.pause) {
            video.play();
            setIsPlaying(true);
        } else if (video.pause) {
            video.pause;
            setIsPlaying(false);
        }
    };
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                cursor: 'pointer'
            }}
            onClick={handleVideoPlayPause}
        >
            <video
                width="100%"
                controls
                controlsList="nodownload"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => alert('No se pudo cargar el video')}
            >
                <source src={video} type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
            </video>
            {!isPlaying && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: '64px',
                        pointerEvents: 'none', // allows the click to go through to the video
                    }}
                >
                    <PlayCircleOutlineIcon fontSize="inherit" />
                </Box>
            )}
        </Box>
    )
}

export default Video