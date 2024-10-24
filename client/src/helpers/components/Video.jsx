import { Box } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import React, { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js';

const Video = ({video}) => {
  
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hls, setHls] = useState(null);

  useEffect(() => {
    // Comprobar si el navegador soporta HLS nativo
    if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = video;
    } else if (Hls.isSupported()) {
      const hlsInstance = new Hls();
      hlsInstance.loadSource(video);
      hlsInstance.attachMedia(videoRef.current);
      setHls(hlsInstance);
    }

    return () => {
      // Limpiar Hls.js cuando se desmonte el componente
      if (hls) {
        hls.destroy();
      }
    };
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