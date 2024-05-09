import { Box, Button, FormControl, IconButton, InputLabel, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import VerificationInput from "react-verification-input";
import Swal from 'sweetalert2';
import axiosClient from '../config/Axios';
import { useDispatch } from 'react-redux';
import { setActiveAccount } from '../redux/features/userSlice';


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
                if(response.status == 200){
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
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Error...",
                    text: "Codigo no valido o ha caducado.",
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
            <Box sx={style}>
                <Typography sx={{mt:2}}>Activar Cuenta.</Typography>
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
                <Button type='submit' color='secondary' sx={{mt:2}} onClick={handleVerificationSubmit}>Enviar</Button> {/* Botón para enviar el código al servidor */}
            </Box>
        </Modal>
    )
}

export default ActivateAccount