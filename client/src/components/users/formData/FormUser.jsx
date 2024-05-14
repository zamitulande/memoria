import { Button, FormControl, Grid, InputLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import axiosClient from '../../../config/Axios'
import UseValidation from '../../../helpers/hooks/UseValidation'

const FormUser = ({ action }) => {

    const { minLength, maxLength } = UseValidation();

    const [user, setUser] = useState({
        identification: '',
        email: '',
        name: '',
        lastName: '',
        password: '',
        confirmPassword: ''
    });

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
    console.log(action)
    const handleSubmit = (e) => {
        e.preventDefault();
        const postUser = async () => {
            console.log(user)
            try {
                if (action === "register") {
                    const res = await axiosClient.post('/auth/register', user);
                    console.log(res.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        postUser();
    }
    return (
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
                            Nombres
                        </InputLabel>
                        <TextField sx={{ border: 2, borderRadius: 1 }}
                            id="name"
                            name="name"
                            type='text'
                            placeholder="Escribe aquí tus nombres"
                            value={user.name}
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
                            Apellidos
                        </InputLabel>
                        <TextField sx={{ border: 2, borderRadius: 1 }}
                            id="lastName"
                            name="lastName"
                            type='text'
                            placeholder="Escribe aquí tus apellidos"
                            value={user.lastName}
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
    )
}

export default FormUser