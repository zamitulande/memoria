import { Alert, Box, Grid, IconButton, Modal, Skeleton, Stack, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Cancel';
import logo from '../../assets/header/logo.png'
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
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
        const {testimonyId} = dataView;
        const action = enable ? 'private' : 'public';
        const actionText = enable ? 'privado' : 'publico';
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${getToken}`
                }
            };
            const response = await axiosClient.put(`/repository/${action}/${testimonyId}`, {}, config);          
                setEnable(response.data.enabled);
                dispatch(setTestimonyIsEnable(response.data.enabled))
            
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

    const handleDelete = async (dataView)=>{
        const {testimonyId, path} = dataView;
        Swal.fire({
            title: "Estas seguro?",
            text: "Esta accion elimina los archivos audio, video o imagen asociados a este testimonio y no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "Cancelar",
            customClass: {
                container: 'my-swal',
            },
          }).then(async (result) => {
            try {
              if (result.isConfirmed) {
                const config = {
                  headers: {
                    'Authorization': `Bearer${getToken}`
                  }
                }
                const response = await axiosClient.delete(`repository/delete/${testimonyId}`, config);
                if (response.status === 200) {
                  Swal.fire({
                    title: "Borrado!",
                    text: "El usuario ha sido borrado",
                    icon: "success",
                    customClass: {
                        container: 'my-swal',
                    },
                  });
                  handleCloseModal();
                }
              }
            } catch (error) {
              console.log(error)
            }
          })
    }

    if (dataView) {
        return (
            <Modal
                open={openViewTestimony}
                onClose={handleCloseModal}>

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
                        {dataView.videoUrl ? (
                            <Grid item xs={12} sm={12} md={12} lg={8}>
                                <Video video={dataView.videoUrl} />
                            </Grid>
                        ) : null}
                        {dataView.audioUrl ? (
                            <Grid item xs={12} sm={12} md={12} lg={8}>
                                <Box  sx={{ mt: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>                                   
                                        <audio controls controlsList="nodownload" style={{ width: '100%', maxWidth: '500px' }}>
                                            <source src={dataView.audioUrl} type="audio/mp3" />
                                            Your browser does not support the audio tag.
                                        </audio>                                   
                                </Box>
                            </Grid>
                        ) : null}
                        <Grid item
                            xs={12}
                            sm={6}
                            md={4}
                            alignItems='center'
                            sx={{
                                position: 'relative',  // Para que el pseudo-elemento se posicione correctamente
                                overflow: 'hidden',  // Para evitar que el pseudo-elemento se salga del Grid
                                '&::before': {
                                    content: '""',  // Necesario para que el pseudo-elemento aparezca
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundImage: `url(${logo})`,  // Ruta a tu imagen
                                    backgroundSize: 'cover',  // Ajusta la imagen para cubrir todo el fondo
                                    backgroundPosition: 'center',  // Centra la imagen
                                    backgroundRepeat: 'no-repeat',  // Evita que la imagen se repita
                                    opacity: 1,  // Aplica la opacidad solo a la imagen
                                    filter: 'blur(22px)',  // Aplica el desenfoque solo a la imagen
                                    zIndex: -1,  // Asegura que esté detrás del contenido
                                }
                            }}
                        >
                            <Box>
                                <Typography fontSize={40} variant="h5" borderBottom={1} >{dataView.title}</Typography>
                            </Box>
                            <Box mt={5}>
                                <Typography fontSize={25} variant="span" fontWeight='bold'>Categoria:&nbsp;</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body">{dataView.category}</Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography fontSize={25} variant="span" fontWeight='bold'>Fecha:&nbsp;</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body">{dataView.evenDate}</Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography fontSize={25} variant="span" fontWeight='bold'>Ubicación:&nbsp;</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body">{dataView.municipio}-{dataView.department}</Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography fontSize={25} variant="span" fontWeight='bold'>Descripción:&nbsp;</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body">{dataView.description}</Typography>
                            </Box>
                            {dataView.descriptionDetail && (
                                <Box mt={2}>
                                    <Typography fontSize={25} variant="span" fontWeight='bold'>Descripción Detallada:&nbsp;</Typography>
                                    <Typography variant="body">{dataView.descriptionDetail}</Typography>
                                </Box>
                            )}
                            {login && role === 'ADMIN' && (
                                <Box mt={2}>
                                    <Typography fontSize={25} variant="span" fontWeight='bold'>Usuario asociado:&nbsp;</Typography>
                                    <Typography variant="body">{dataView.identification}</Typography>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                    {login && role === 'ADMIN' && (
                        <Grid container justifyContent="end" mt={3}>
                            <Grid item xs={12} sm={2}>
                                <IconButton onClick={() => handleDelete(dataView)} color='error'>
                                    <EditIcon />
                                    Eliminar
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <IconButton onClick={() => handleUpdate(dataView)} color='primary'>
                                    <EditIcon />
                                    Editar
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Tooltip >
                                    <IconButton onClick={() => handleEnabled(dataView)} color='success'>
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
                        {video.length > 0 ? (
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
                        ) : null}
                        {audio.length > 0 ? (
                            <Grid item xs={12} sm={6}>
                                {audio.map((file, index) => {
                                    const fileType = getFileType(file);
                                    const fileUrl = URL.createObjectURL(file);
                                    return (
                                        <Box key={index} sx={{ mt: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {fileType === 'audio' && (
                                                <audio controls style={{ width: '100%', maxWidth: '500px' }}>
                                                    <source src={fileUrl} type="audio/mp3" />
                                                    Your browser does not support the audio tag.
                                                </audio>
                                            )}
                                        </Box>
                                    )
                                })}
                            </Grid>
                        ) : null}
                        <Grid item xs={12} sm={6}>
                            {image.map((file, index) => {
                                const fileType = getFileType(file);
                                const fileUrl = URL.createObjectURL(file);
                                return (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        {fileType === 'image' && (
                                            <img src={fileUrl} style={{ maxWidth: '80%', height: 'auto' }} />
                                        )}
                                    </Box>
                                )
                            })}
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant='h6' borderBottom={1}>Categoria</Typography>
                            <Typography variant='span'>{dataPreview.category}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant='h6' borderBottom={1}>Fecha</Typography>
                            <Typography variant='span'>{dataPreview.evenDate}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant='h6' borderBottom={1}>Lugar</Typography>
                            <Typography variant='span'>{dataPreview.municipio}-{dataPreview.department}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant='h6' borderBottom={1}>Titulo</Typography>
                            <Typography variant='span'>{dataPreview.title}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Typography variant='h6' borderBottom={1}>Descripción</Typography>
                            <Typography variant='span'>{dataPreview.description}</Typography>
                        </Grid>
                        {dataPreview.descriptionDetail && (
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography variant='h6' borderBottom={1}>Descripción Detallada</Typography>
                                <Typography variant='span'>{dataPreview.descriptionDetail}</Typography>
                            </Grid>
                        )}
                        <Grid item xs={12} sm={4}>
                            <IconButton onClick={() => handleCloseModal()} color='primary'>
                                <EditIcon />
                                Editar
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <IconButton onClick={(e) => submit(e)} color='secondary'>
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