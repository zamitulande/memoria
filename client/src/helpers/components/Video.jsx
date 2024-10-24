import { Box } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import React, { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js';

const Video = ({video}) => {
  
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hls, setHls] = useState(null);
useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Si el navegador soporta nativamente HLS
      videoElement.src = video;
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        // Configuración personalizada para aumentar el buffer
        maxBufferLength: 30,        // 30 segundos de buffer
        maxMaxBufferLength: 60,     // Máximo de 60 segundos en el buffer
        initialLiveManifestSize: 3, // Cantidad inicial de fragmentos cargados
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


  const handleVideoPlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
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
      <video
        ref={videoRef}
        controls
        style={{ width: '100%', height: '100%' }}
      />

      {!isPlaying && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '32px', // Tamaño del ícono
            pointerEvents: 'none',
          }}
        >
          <PlayCircleOutlineIcon fontSize="inherit" />
        </Box>
      )}
    </Box>
  );
}

export default Video