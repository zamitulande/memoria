import { Alert, Box, Grid, IconButton, Modal, Skeleton, Stack, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import React, { useEffect, useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto'
};


const ViewTestimony = ({
    open,
    setOpen,
    category,
    title,
    description,
    eventDate,
    municipio,
    department,
    descriptionDetail,
    files,
    submit }) => {

    const handleCloseModal = () => {
        setOpen(false)
    }
    const { image, audio, video } = files;

    const getFileType = (file) => {
        if (file.type.startsWith('video')) {
            return 'video';
        }
        if (file.type.startsWith('image')) {
            return 'image';
        }
        if (file.type.startsWith('audio')) {
            return 'audio';
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">

            <Box sx={style}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Alert severity="info">
                            Esta es una previsualización del testimonio que se guardará, valide que la información sea correcta.
                        </Alert>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {video.map((file, index) => {
                            const fileType = getFileType(file);
                            const fileUrl = URL.createObjectURL(file);
                            return (
                                <Box key={index} sx={{ mb: 2 }}>
                                    {fileType === 'video' && (
                                        <video width="100%" controls>
                                            <source src={fileUrl} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </Box>
                            )
                        })}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {image.map((file, index) => {
                            const fileType = getFileType(file);
                            const fileUrl = URL.createObjectURL(file);
                            return (
                                <Box key={index} sx={{ mb: 2 }}>
                                    {fileType === 'image' && (
                                        <img src={fileUrl} style={{ maxWidth: '100%', height: 'auto' }} />
                                    )}
                                </Box>
                            )
                        })}
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Typography variant='h6'>Categoria</Typography>
                        <Typography variant='body'>{category}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Typography variant='h6'>Fecha</Typography>
                        <Typography variant='body'>{eventDate}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Typography variant='h6'>Lugar</Typography>
                        <Typography variant='body'>{municipio}-{department}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Typography variant='h6'>Titulo</Typography>
                        <Typography >{title}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <Typography variant='h6'>Descripción</Typography>
                        <Typography variant='body'>{description}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                    <Typography variant='h6'>Descripción Detallada</Typography>
                        <Typography variant='body'>{descriptionDetail}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <IconButton onClick={() => handleCloseModal()}>
                            <EditIcon />
                            Editar
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <IconButton onClick={(e) => submit(e)}>
                            <SaveIcon />
                            Guardar
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default ViewTestimony