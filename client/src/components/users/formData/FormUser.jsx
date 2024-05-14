import { Box, Button, FormControl, Grid, InputLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import axiosClient from '../../../config/Axios'
import UseValidation from '../../../helpers/hooks/UseValidation'
import LoadingGif from '../../../assets/loading/loading.gif'
import Swal from 'sweetalert2';

const FormUser = ({ action }) => {

    const { minLength, maxLength } = UseValidation();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [user, setUser] = useState({
        identification: '',
        email: '',
        firstName: '',
        secondName:'',
        firstLastName: '',
        password: '',
        confirmPassword: ''
    });

    const resetForm = ()=>{
        setUser({
            identification: '',
            email: '',

            password: ''
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
                setIsLoading(false)
                setMessage(response.data.message)
                Swal.fire({
                    title: message,
                    
                });
            }
            )
    }
    return (
        <Box position="relative">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={4}>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Identificacion
                            </InputLabel>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="identification"
                                name="identification"
                                type='number'
                                placeholder="Escribe aquí tu identificación"
                                value={user.identification}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                helperText={
                                    (!minLength(user.identification, 8) && user.identification)
                                        ? "El número de identificación debe tener al menos 8 caracteres"
                                        : (!maxLength(user.identification, 12) && user.identification)
                                            ? "El número de identificación debe tener como máximo 12 caracteres"
                                            : ""
                                }
                                required />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Correo electronico
                            </InputLabel>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="email"
                                name="email"
                                type='email'
                                placeholder="Escribe aquí tu correo electronico"
                                value={user.email}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Primer nombre
                            </InputLabel>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="name"
                                name="name"
                                type='text'
                                placeholder="Escribe aquí tus nombres"
                                value={user.firstName}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Segundo nombre
                            </InputLabel>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="secondName"
                                name="secondName"
                                type='text'
                                placeholder="Escribe aquí tus nombres"
                                value={user.secondName}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Primer apellido
                            </InputLabel>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="firstLastName"
                                name="firstLastName"
                                type='text'
                                placeholder="Escribe aquí tus apellidos"
                                value={user.firstLastName}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Segundo apellido
                            </InputLabel>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="secondLastName"
                                name="secondLastName"
                                type='text'
                                placeholder="Escribe aquí tus apellidos"
                                value={user.secondLastName}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Contraseña
                            </InputLabel>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="password"
                                name='password'
                                type='password'
                                placeholder="Escribe aquí tu contraseña"
                                value={user.password}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Confirmar Contraseña
                            </InputLabel>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="confirmPassword"
                                name='confirmPassword'
                                type='password'
                                placeholder="Escribe aquí tu contraseña"
                                value={user.confirmPassword}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                    </Grid>
                </Grid>
                <Button type="submit" color='secondary' disabled={isDisable()}>register</Button>
            </form>
            {isLoading && (
                <Box className="loading-overlay">
                    <img src={LoadingGif} alt="Loading..." />
                </Box>
            )}
        </Box>

    )
}

export default FormUser