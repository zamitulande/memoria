import { Alert, AlertTitle, Box, Button, Grid, Tab, Tabs } from '@mui/material';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import React, { useState } from 'react'

const LoadFiles = ({ onFilesChange }) => {

  const [value, setValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedFile(null);
    onFilesChange(null, newValue);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onFilesChange(file, value);
  };

  const renderFileInput = () => {
    let accept;
    switch (value) {
      case 0:
        accept = 'audio/*';
        break;
      case 1:
        accept = 'video/*';
        break;
      case 2:
        accept = 'image/*';
        break;
      default:
        accept = '';
    }
    return (
      <Grid container mt={1} spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Alert severity="info">
            <AlertTitle>
              {value === 0 ? 'Audio' : value === 1 ? 'Video' : 'Imagen'} del testimonio
            </AlertTitle>
            A continuación, seleccione el archivo de {value === 0 ? 'Audio' : value === 1 ? 'Video' : 'Imagen'} que contiene el relato del testimonio.
            El tamaño máximo permitido para {value === 0 ? 'Audio' : value === 1 ? 'Video' : 'Imagen'} es de {value === 0 ? '10' : value === 1 ? '512' : '8'} Megabytes.
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            required={value === 2}
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button variant="contained" component="span" color="secondary">
              Cargar {value === 0 ? 'Audio' : value === 1 ? 'Video' : 'Imagen'}
            </Button>
          </label>
        </Grid>
        {selectedFile && (
          <Grid item xs={12}>
            <Box mt={2}>
              <strong>Archivo {value === 0 ? 'Audio' : value === 1 ? 'Video' : 'Imagen'} :</strong> {selectedFile.name}
            </Box>
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <Box mt={2}>
      <Tabs
        sx={{ backgroundColor: 'gray' }}
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