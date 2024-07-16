import { Box, Button, Tab, Tabs } from '@mui/material';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import React, { useState } from 'react'

const LoadFiles = () => {

    const [value, setValue] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelectedFile(null);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
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
            <Box mt={2} display="flex" justifyContent="center">
              <input
                type="file"
                accept={accept}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-input"
                
              />
              <label htmlFor="file-input">
                <Button variant="contained" component="span" color='secondary'>
                  Cargar {value === 0 ? 'Audio' : value === 1 ? 'Video' : 'Imagen'}
                </Button>
              </label>
              {selectedFile && (
                <Box mt={2}>
                  <strong>Archivo :</strong> {selectedFile.name}
                </Box>
              )}
            </Box>
          );
        };
      
        return (
          <Box mt={5}>
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