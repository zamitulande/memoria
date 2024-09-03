import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import UseValidation from '../helpers/hooks/UseValidation';
import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput } from '@mui/material';
import CloseIcon from '@mui/icons-material/Cancel';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axiosClient from '../config/Axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const ResetPassword = ({ open, setOpen }) => {

    const [openModal, setOpenModal] = useState(false);

    const { passwordValid } = UseValidation();
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    const userId = useSelector((state)=>state.user.userId)
    const getToken = useSelector((state)=>state.user.token)

    // Si se proporciona un token en la URL, abre el modal directamente
    useEffect(() => {
        if (token) {
            setOpenModal(true);
        }
    }, [token]);
    
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleCloseModal = ()=>{
        setOpenModal(false)
        setOpen(false)        
        //dispatch(setActiveAccount(false))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const requestForguet = {
            token, 
            password, 
            confirmPassword
        }
        const requestSession ={
            password, 
            confirmPassword,
            userId
        }
        const request = token ? requestForguet : requestSession;
        const endPoint = token ? '/auth/reset-password' : '/auth/reset-password-session';
        const config = token ? {} : {
            headers: {
                'Authorization': `Bearer ${getToken}`
            }
        };
        try {
            const response = await axiosClient.post(endPoint, request, config);
            const messageResponse = response.data.message;
            if (token) {
                navigate('/');
            }
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: messageResponse,
                customClass: {
                    container: 'my-swal'
                },
            });
            setOpenModal(false)
            setOpen(false)
            
        } catch (error) {
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
            open={openModal || open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='modal-style'>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        left: '90%',
                    }}
                >
                    <CloseIcon />
                </IconButton>
              <Box padding={3}>
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
                    <Grid container mt={2}>
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
            </Box>
        </Modal>
  )
}

export default ResetPassword