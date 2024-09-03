import { Alert, Box, Grid, IconButton, Modal, Skeleton, Stack, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Cancel';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DoneIcon from '@mui/icons-material/Done';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFormEditTestimony, setOpenViewTestimony, setTestimonyId, setTestimonyIsEnable } from '../../redux/features/TestimonySlice';
import Video from './Video';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../config/Axios';
import Swal from 'sweetalert2';

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
    dataPreview,
    submit,
    dataView
}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const openViewTestimony = useSelector((state) => state.testimony.openViewTestimony)

    const login = useSelector((state) => state.user.login);
    const role = useSelector((state) => state.user.role);
    const getToken = useSelector((state) => state.user.token)

    let isEnabled;

    if (dataView) {
        isEnabled = dataView.enabled
    }
    if (dataPreview) {
        isEnabled = dataPreview.enabled
    }

    const [enable, setEnable] = useState(isEnabled)

    const handleCloseModal = () => {
        dispatch(setOpenViewTestimony(false))
    }

    const handleEnabled = async (dataView) => {
        const action = enable ? 'private' : 'public';
        const actionText = enable ? 'privado' : 'publico';
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${getToken}`
                }
            };
            const response = await axiosClient.put(`/repository/${action}/${dataView.testimonyId}`, {}, config);
            if (response && response.data) {
                console.log(response)
                setEnable(response.data.enabled);
                dispatch(setTestimonyIsEnable(response.data.enabled))
            }
            Swal.fire({
                icon: "success",
                text: `El testimonio ahora es ${actionText}.`,
                customClass: {
                    container: 'my-swal'
                },
            });
        } catch (error) {
            console.log(error)

        }
    };
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

    const handleUpdate = (dataView) => {
        navigate('/repositorio/editar');
        dispatch(setFormEditTestimony(dataView))
        dispatch(setTestimonyId(dataView))
        dispatch(setOpenViewTestimony(false))
    }

    if (dataView) {
        return (
            <Modal
                open={openViewTestimony}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">

                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            marginTop: -5,
                            left: '97%',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={8}>
                            <Video video={dataView.videoUrl} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} alignItems='center'>
                            <Box >
                                <Typography variant="h5">{dataView.title}</Typography>
                            </Box>
                            <Box mt={5}>
                                <Typography variant="h6">Categoria:&nbsp;</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body">{dataView.category}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">Fecha:&nbsp;</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body">{dataView.evenDate}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">Ubicación:&nbsp;</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body">{dataView.municipio}-{dataView.department}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">Descripción:&nbsp;</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body">{dataView.description}</Typography>
                            </Box>
                            {dataView.descriptionDetail && (
                                <Box>
                                    <Typography variant="h6">Descripción Detallada:&nbsp;</Typography>
                                    <Typography variant="body">{dataView.descriptionDetail}</Typography>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                    {login && role === 'ADMIN' && (
                        <Grid container justifyContent="end">
                            <Grid item xs={12} sm={2}>
                                <IconButton onClick={() => handleUpdate(dataView)}>
                                    <EditIcon />
                                    Editar
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Tooltip title={enable ? "Hacer Privado" : "Hacer Publico "}>
                                    <IconButton onClick={() => handleEnabled(dataView)}>
                                        {enable ? <LockIcon /> : <LockOpenIcon />}
                                        {enable ? "Privatizar" : "Publicar"}
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Modal>
        )
    }
    if (dataPreview) {
        const { image, video, audio } = dataPreview.files;
        return (
            <Modal
                open={openViewTestimony}
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
                            <Typography variant='body'>{dataPreview.category}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant='h6'>Fecha</Typography>
                            <Typography variant='body'>{dataPreview.evenDate}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant='h6'>Lugar</Typography>
                            <Typography variant='body'>{dataPreview.municipio}-{dataPreview.department}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant='h6'>Titulo</Typography>
                            <Typography >{dataPreview.title}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant='h6'>Descripción</Typography>
                            <Typography variant='body'>{dataPreview.description}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant='h6'>Descripción Detallada</Typography>
                            <Typography variant='body'>{dataPreview.descriptionDetail}</Typography>
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

    return;


}

export default ViewTestimony