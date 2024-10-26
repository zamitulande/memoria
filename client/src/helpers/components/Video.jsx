import { Box, Typography } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import React, { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js';

const Video = ({video}) => {
  
  const videoRef = useRef(null);
  const [hls, setHls] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Si el navegador soporta nativamente HLS
      videoElement.src = video;
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        // Configuración personalizada para aumentar el buffer
        maxBufferLength: 60,        // 30 segundos de buffer
        maxMaxBufferLength: 60,     // Máximo de 60 segundos en el buffer
        initialLiveManifestSize: 4, // Cantidad inicial de fragmentos cargados
      });

      hls.loadSource(video);
      hls.attachMedia(videoElement);
      setHls(hls);

      // Limpiar HLS al desmontar el componente
      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    }
    
   
  }, [video]);

   // Mostrar mensaje de "Cargando" por 20 segundos
   setTimeout(() => {
    setLoading(false);
  }, 15000);


  const handleVideoPlayPause = (e) => {
    const video = e.target;
    if (!video.pause) {
        video.play();
    } else if (video.pause) {
        video.pause;
    }
};

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%', // Ajusta el ancho del video
        height: '100%', // Ajusta el alto del video
        cursor: 'pointer',
      }}
      onClick={handleVideoPlayPause}
    >
      {loading ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 1)',
            padding: '24% 40%',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6">Cargando...</Typography>
        </Box>
      ) : null}
      <video
        ref={videoRef}
        controls
        style={{ width: '100%', height: '100%' }}
      />

    </Box>
  );
}

export default Video