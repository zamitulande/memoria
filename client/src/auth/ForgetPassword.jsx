import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import UseValidation from '../helpers/hooks/UseValidation';
import axiosClient from '../config/Axios';
import CloseIcon from '@mui/icons-material/Cancel';
import LoadingGif from '../assets/loading/loading.gif'
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    px: 2,
};

const ForgetPassword = ({ open, setOpen }) => {

    const { minLength } = UseValidation();

    const [identification, setIdentification] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        axiosClient.post('/auth/forget-password', {}, {params: { identification: identification }})
            .then((response) => {
                const messageResponse = response.data.message;
                setIsLoading(false)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: messageResponse,
                });
                setOpen(false)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false);
                const errorMessage = error.response.data.message
                Swal.fire({
                    icon: "error",
                    text: errorMessage,
                    customClass: {
                        container: 'my-swal'
                    },
                });
            });
    }

    const handleCloseModal = ()=>{
        setOpen(false)
    }

    return (
        <Modal
            open={open}
            onClose={(e) => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        left: '90%',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography sx={{ mt: 2 }}>Recuperar contraseña.</Typography>
                <Typography>ingrese su numero de identificación.</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Identificacion"
                        color='textField'
                        variant="outlined"
                        name="identification"
                        type='text'
                        value={identification}
                        onChange={(e) => {
                            const value = e.target.value.slice(0, 12);
                            setIdentification(value)
                        }}
                        fullWidth
                        helperText={
                            (!minLength(identification, 8) && identification)
                                ? "Este campo debe tener al menos 8 caracteres"
                                : ""
                        }
                        FormHelperTextProps={{ sx: { color: "error.main" } }}
                        required />

                    <Button type='submit' color='secondary' sx={{ mt: 2 }} onClick={handleSubmit}>Enviar</Button> {/* Botón para enviar el código al servidor */}
                </form>
                {
                isLoading && (
                    <Box className="loading-overlay">
                        <img src={LoadingGif} alt="Loading..." />
                    </Box>
                )
            }
            </Box>
        </Modal>
    )
}

export default ForgetPassword