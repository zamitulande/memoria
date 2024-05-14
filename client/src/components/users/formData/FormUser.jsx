import { Box, Button, FilledInput, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react'
import axiosClient from '../../../config/Axios'
import UseValidation from '../../../helpers/hooks/UseValidation'
import LoadingGif from '../../../assets/loading/loading.gif'
import Swal from 'sweetalert2';

const FormUser = ({ action }) => {

    const { minLength, maxLength } = UseValidation();

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const [user, setUser] = useState({
        identification: '',
        email: '',
        confirmEmail:'',
        firstName: '',
        secondName: '',
        firstLastName: '',
        secondLastName: '',
        password: '',
        confirmPassword: ''
    });  

    const resetForm = () => {
        setUser({
            identification: '',
            email: '',
            confirmEmail:'',
            firstName: '',
            secondName: '',
            firstLastName: '',
            secondLastName: '',
            password: '',
            confirmPassword: ''
        })
    }

    const isDisable = () => {
        !user.identification ||
            !minLength(user.identification) ||
            !maxLength(user.identification)
    }

    const handleUserSportsManChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axiosClient.post('/auth/register', user)
            .then((response) => {
                const messageResponse = response.data.message;
                resetForm();
                setIsLoading(false)
                Swal.fire({
                    title: messageResponse,

                });
            })
            .catch((error) => {
                setIsLoading(false);
                console.error('Error:', error);
            });
    }
    return (
        <Box position="relative">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4}>
                        <TextField
                            label="Identificacion"
                            color='textField'
                            variant="outlined"
                            name="identification"
                            type='number'
                            value={user.identification}
                            onChange={handleUserSportsManChange}
                            fullWidth
                            size="small"
                            helperText={
                                (!minLength(user.identification, 8) && user.identification)
                                    ? "El número de identificación debe tener al menos 8 caracteres"
                                    : (!maxLength(user.identification, 12) && user.identification)
                                        ? "El número de identificación debe tener como máximo 12 caracteres"
                                        : ""
                            }
                            required />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            label="Correo electronico"
                            color='textField'
                            variant="outlined"
                            name="email"
                            type='email'
                            value={user.email}
                            onChange={handleUserSportsManChange}
                            fullWidth
                            size="small"
                            required />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            label="Confirmar correo electronico"
                            color='textField'
                            variant="outlined"
                            name="confirmEmail"
                            type='email'
                            value={user.confirmEmail}
                            onChange={handleUserSportsManChange}
                            fullWidth
                            size="small"
                            required />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            label="Primer nombre"
                            color='textField'
                            variant="outlined"
                            name="firstName"
                            type='text'
                            value={user.firstName}
                            onChange={handleUserSportsManChange}
                            fullWidth
                            size="small"
                            required />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Segundo nombre"
                            color='textField'
                            variant="outlined"
                            name="secondName"
                            type='text'
                            value={user.secondName}
                            onChange={handleUserSportsManChange}
                            fullWidth
                            size="small" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Primer apellido"
                            color='textField'
                            variant="outlined"
                            name="firstLastName"
                            type='text'
                            value={user.firstLastName}
                            onChange={handleUserSportsManChange}
                            fullWidth
                            size="small"
                            required />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Segundo apellido"
                            color='textField'
                            variant="outlined"
                            name="secondLastName"
                            type='text'
                            value={user.secondLastName}
                            onChange={handleUserSportsManChange}
                            fullWidth
                            size="small" />
                    </Grid>
                    <Grid item xs={4}>
                    <FormControl variant="outlined" color='textField' fullWidth required>
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                value={user.password}
                                name='password'
                                onChange={handleUserSportsManChange}
                                label="Contraseña"
                                size='small'
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
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl variant="outlined" color='textField' fullWidth required>
                            <InputLabel htmlFor="outlined-adornment-password">Confirmar contraseña</InputLabel>
                            <OutlinedInput
                                type={showPasswordConfirm ? 'text' : 'password'}
                                value={user.confirmPassword}
                                name='confirmPassword'
                                onChange={handleUserSportsManChange}
                                label="Confirmar contraseña"
                                size='small'
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

                </Grid>
                <Button type="submit" color='secondary' disabled={isDisable()}>register</Button>
            </form>
            {
                isLoading && (
                    <Box className="loading-overlay">
                        <img src={LoadingGif} alt="Loading..." />
                    </Box>
                )
            }
        </Box >

    )
}

export default FormUser