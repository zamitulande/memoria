import { Alert, AlertTitle, Box, Button, Grid, IconButton, Tab, Tabs } from '@mui/material';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import React, { useEffect, useState } from 'react'

const LoadFiles = ({ onFilesChange, resetTrigger }) => {

  const [value, setValue] = useState(0);
  const [files, setFiles] = useState({ audio: [], video: [], image: [] });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedFiles = { ...files };
      if (value === 0) {
        updatedFiles.audio.push(file);
      } else if (value === 1) {
        updatedFiles.video.push(file);
      } else if (value === 2) {
        updatedFiles.image.push(file);
      }
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
      event.target.value = '';
    }
  };

  const handleFileDelete = (fileTypeKey, index) => {
    const updatedFiles = { ...files };
    updatedFiles[fileTypeKey].splice(index, 1);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const renderFileInput = () => {
    let accept;
    let fileTypeKey;
    let fileType;
    switch (value) {
      case 0:
        accept = 'audio/*';
        fileTypeKey = 'audio';
        fileType = 'Audio';
        break;
      case 1:
        accept = 'video/*';
        fileTypeKey = 'video';
        fileType = 'Video';
        break;
      case 2:
        accept = 'image/*';
        fileTypeKey = 'image';
        fileType = 'Imagen';
        break;
      default:
        accept = '';

    }

    const isAudioLoaded = files.audio.length > 0;
    const isVideoLoaded = files.video.length > 0;

    return (
      <Grid container mt={1} spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Alert severity="info">
            <AlertTitle>
              {fileType} del testimonio
            </AlertTitle>
            A continuación, seleccione el archivo de {value === 0 ? 'Audio' : value === 1 ? 'Video' : 'Imagen'} que contiene el relato del testimonio.
            El tamaño máximo permitido para {value === 0 ? 'Audio' : value === 1 ? 'Video' : 'Imagen'} es de {value === 0 ? '10' : value === 1 ? '512' : '1'} Megabytes,
            los formatos permitidos son: {value === 0 ? 'WAV, MP3, WMA, ACC.' : value === 1 ? 'MP4, AVI, WMV, WEBM. ' : 'PNG, JPG, JPEG.'}
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id={`file-input-${value}`}
          />
          <label
            htmlFor={`file-input-${value}`}
            onClick={(e) => {
              // Evita que el label abra el file input si el botón está deshabilitado
              if (
                (fileTypeKey === 'audio' && (isVideoLoaded || isAudioLoaded))  ||
                (fileTypeKey === 'video' && (isAudioLoaded || isVideoLoaded)) ||
                (fileTypeKey === 'image' && files.image.length > 0)
              ) {
                e.preventDefault();
              }
            }}
          >
            <Button
              variant="contained"
              component="span"
              color="secondary"
              disabled={
                (fileTypeKey === 'audio' && (isVideoLoaded || isAudioLoaded)) || 
                (fileTypeKey === 'video' && (isAudioLoaded || isVideoLoaded)) || 
                (fileTypeKey === 'image' && files.image.length > 0)
              }
            >
              Cargar {fileType}
            </Button>
          </label>
          {fileTypeKey === 'audio' && isVideoLoaded && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Ya tiene un archivo video cargado, no puede cargar un archivo de audio.
            </Alert>
          )}
          {fileTypeKey === 'video' && isAudioLoaded && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Ya tiene un archivo audio cargado, no puede cargar un archivo de video.
            </Alert>
          )}
        </Grid>
        {files[fileTypeKey].map((file, index) => (
          <Grid item xs={12} key={index}>
            <Box mt={2}>
              <strong>Archivo {fileType} :</strong> {file.name}
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => handleFileDelete(fileTypeKey, index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  useEffect(() => {
    if (resetTrigger) {
      setFiles({ audio: [], video: [], image: [] });
    }
  }, [resetTrigger]);


  return (
    <Box mt={2}>
      <Tabs
        sx={{ backgroundColor: 'textFiled.main' }}
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab icon={<AudioFileIcon />} label="AUDIO" />
        <Tab icon={<VideoFileIcon />} label="VIDEO" />
        <Tab icon={<InsertPhotoIcon />} label="IMAGEN" />
      </Tabs>
      {renderFileInput()}
    </Box>
  );
}

export default LoadFiles