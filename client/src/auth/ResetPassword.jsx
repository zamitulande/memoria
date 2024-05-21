import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import UseValidation from '../helpers/hooks/UseValidation';
import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput } from '@mui/material';
import CloseIcon from '@mui/icons-material/Cancel';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axiosClient from '../config/Axios';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    px: 2,
};

const ResetPassword = () => {

    const { passwordValid } = UseValidation();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    console.log(token)

    const [open, setOpen] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleCloseModal = ()=>{
        setOpen(false)
        //dispatch(setActiveAccount(false))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const request = {
            token, 
            password, 
            confirmPassword
        }
        try {
            const response = await axiosClient.post('/auth/reset-password', request);
            const messageResponse = response.data.message;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: messageResponse,
            });
        } catch (error) {
            console.error(error);
            const errorMessage = error.response.data.message
            Swal.fire({
                icon: "error",
                text: errorMessage,
                customClass: {
                    container: 'my-swal'
                },
            });
        }
    }
  return (
    <Modal
            open={open}
            onClose={handleCloseModal}
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
                <form onSubmit={handleSubmit}>
                <Grid item xs={4}>
                        <FormControl variant="outlined" color='textField' fullWidth required>
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                name='password'
                                onChange={(e) => setPassword(e.target.value)}
                                label="Contraseña"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword((show) => !show)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText error>
                                {!passwordValid(password) && password
                                    ? "La contraseña debe tener al menos 8 caracteres, incluyendo una letra, un número y un carácter especial."
                                    : ""}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl variant="outlined" color='textField' fullWidth required>
                            <InputLabel htmlFor="outlined-adornment-password">Confirmar contraseña</InputLabel>
                            <OutlinedInput
                                type={showPasswordConfirm ? 'text' : 'password'}
                                value={confirmPassword}
                                name='confirmPassword'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                label="Confirmar contraseña"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPasswordConfirm((show) => !show)}
                                            edge="end"
                                        >
                                            {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Button
                                type="submit"
                                color='secondary' 
                                fullWidth
                                sx={{
                                    height: '100%'
                                }}
                            >
                                Reestablecer contraseña
                            </Button>
                        </Grid>                       
                    </Grid>
                </form>
            </Box>
        </Modal>
  )
}

export default ResetPassword