import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import UseValidation from '../helpers/hooks/UseValidation';
import axiosClient from '../config/Axios';
import CloseIcon from '@mui/icons-material/Cancel';
import Swal from 'sweetalert2';
import Loading from '../helpers/components/Loading';

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
                    customClass: {
                        container: 'my-swal'
                    },
                });
                setOpen(false)
                setIdentification("")
            })
            .catch((error) => {
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
            <Box className='modal-style'>
            <Box padding={4}>
            <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        left: '90%',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography >Recuperar contraseña.</Typography>
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
                    <Loading isLoading={isLoading}/>
                )
            }
            </Box>
            </Box>
        </Modal>
    )
}

export default ForgetPassword