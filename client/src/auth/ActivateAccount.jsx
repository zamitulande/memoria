import { Box, Button, FormControl, IconButton, InputLabel, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import VerificationInput from "react-verification-input";
import Swal from 'sweetalert2';
import axiosClient from '../config/Axios';
import { useDispatch } from 'react-redux';
import { setActiveAccount } from '../redux/features/userSlice';

const ActivateAccount = () => {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(true);
    const [verificationCode, setVerificationCode] = useState("");

    const handleVerificationCodeChange = (code) => {
        setVerificationCode(code);
    };

    const handleVerificationSubmit = () => {
        const postToken = async () => {
            try {
                const response = await axiosClient.get('/auth/activate-account', {
                    params: {
                        token: verificationCode // Pasar el token como parámetro de consulta
                    }
                });
                if (response.status == 200) {
                    setOpen(!open)
                }
                dispatch(setActiveAccount(true))
                Swal.fire({
                    title: "Debera ingresar su correo electronico y contraseña para ingresar a la plataforma!",
                    customClass: {
                        container: 'my-swal'
                    },
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error...",
                    text: error.response.data.message,
                    customClass: {
                        container: 'my-swal'
                    },
                });
            }
        }
        postToken();
    };
    return (
        <Modal
            open={open}
            onClose={(e) => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='modal-style'>
                <Box padding={3}>
                    <Typography sx={{ mt: 2 }}>Activar Cuenta.</Typography>
                    <Typography>ingrese el codigo que llego a su correo.</Typography>
                    <VerificationInput
                        length={6} // Longitud del código
                        onChange={handleVerificationCodeChange}
                        classNames={{
                            container: "container",
                            character: "character",
                            characterInactive: "character--inactive",
                            characterSelected: "character--selected",
                            characterFilled: "character--filled",
                        }} />
                    <Button type='submit' variant='contained' color='secondary' sx={{ mt: 2 }} onClick={handleVerificationSubmit}>Enviar</Button> {/* Botón para enviar el código al servidor */}
                </Box>
            </Box>
        </Modal>
    )
}

export default ActivateAccount