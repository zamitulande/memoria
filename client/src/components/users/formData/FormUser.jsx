import { Box, Button, Checkbox, FilledInput, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react'
import axiosClient from '../../../config/Axios'
import UseValidation from '../../../helpers/hooks/UseValidation'
import LoadingGif from '../../../assets/loading/loading.gif'
import Swal from 'sweetalert2';
import Recaptcha from '../../../helpers/components/Recaptcha';
import Conditions from '../../../helpers/components/Conditions';
import SelectDepartment from '../../../helpers/components/SelectDepartment';
import SelectCity from '../../../helpers/components/SelectCity';


const FormUser = ({ action }) => {

    const { isCellPhone, passwordValid, } = UseValidation();

    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const [identification, setIdentification] = useState("")
    const [email, setEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [firstLastName, setFirstLastName] = useState("")
    const [secondLastName, setSecondLastName] = useState("")
    const [department, setDepartment] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [recaptchaIsValid, setRecaptchaIsValid] = useState(false)
    const [conditios, setConditios] = useState(false);

    let municipio;
    if (city) {
        const { name } = city;
        municipio = name;
    }

    const resetForm = () => {
        setIdentification("")
        setEmail("")
        setConfirmEmail("")
        setFirstName("")
        setSecondName("")
        setFirstLastName("")
        setSecondLastName("")
        setPassword("")
        setConfirmPassword("")
        setConditios(false)
        setCity("")
        setDepartment("")
        setContactNumber("")
    }

    const isDisable = () => {
        return (
            !identification ||
            !minLength(identification, 8) ||
            !firstName ||
            !minLength(firstName, 3) ||
            !firstLastName ||
            !minLength(firstLastName, 3) ||
            !password ||
            !minLength(password, 8) ||
            !city ||
            !department ||
            !contactNumber ||
            !confirmPassword ||
            !minLength(confirmPassword, 8)
        )
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = {
            identification,
            email,
            confirmEmail,
            firstName,
            secondName,
            firstLastName,
            secondLastName,
            contactNumber,
            department,
            municipio,
            password,
            confirmPassword
        }
        axiosClient.post('/auth/register', user)
            .then((response) => {
                const messageResponse = response.data.message;
                resetForm();
                setIsLoading(false)
                Swal.fire({
                    position: "bottom-end",
                    icon: "success",
                    title: messageResponse,
                });
            })
            .catch((error) => {
                setIsLoading(false);
                const errorMessage = error.response.data.message
                Swal.fire({
                    icon: "error",
                    text: errorMessage,
                });
            });
    }

    // Función para verificar la longitud mínima
    const minLength = (str, length) => {
        return str.length >= length;
    };

    // Función para verificar la longitud máxima
    const maxLength = (str, length) => {
        return str.length <= length;
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

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
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Correo electronico"
                            color='textField'
                            variant="outlined"
                            name="email"
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Confirmar correo electronico"
                            color='textField'
                            variant="outlined"
                            name="confirmEmail"
                            type='email'
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            fullWidth
                            required />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Primer nombre"
                            color='textField'
                            variant="outlined"
                            name="firstName"
                            type='text'
                            value={firstName}
                            onChange={(e) => setFirstName(capitalizeFirstLetter(e.target.value))}
                            fullWidth
                            required
                            inputProps={{ maxLength: 11 }}
                            helperText={
                                (!minLength(firstName, 3) && firstName)
                                    ? "Este campo debe tener al menos 3 caracteres"
                                    : (!maxLength(firstName, 10) && firstName)
                                        ? "Este campo no puede ser mayor a 10 caracteres"
                                        : ""
                            }
                            FormHelperTextProps={{ sx: { color: "error.main" } }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Segundo nombre"
                            color='textField'
                            variant="outlined"
                            name="secondName"
                            type='text'
                            value={secondName}
                            onChange={(e) => setSecondName(capitalizeFirstLetter(e.target.value))}
                            fullWidth
                            inputProps={{ maxLength: 11 }}
                            helperText={
                                (!minLength(secondName, 3) && secondName)
                                    ? "Este campo debe tener al menos 3 caracteres"
                                    : (!maxLength(secondName, 10) && secondName)
                                        ? "Este campo no puede ser mayor a 10 caracteres"
                                        : ""
                            }
                            FormHelperTextProps={{ sx: { color: "error.main" } }}
                        />

                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Primer apellido"
                            color='textField'
                            variant="outlined"
                            name="firstLastName"
                            type='text'
                            value={firstLastName}
                            onChange={(e) => setFirstLastName(capitalizeFirstLetter(e.target.value))}
                            fullWidth
                            required
                            inputProps={{ maxLength: 11 }}
                            helperText={
                                (!minLength(firstLastName, 3) && firstLastName)
                                    ? "Este campo debe tener al menos 3 caracteres"
                                    : (!maxLength(firstLastName, 10) && firstLastName)
                                        ? "Este campo no puede ser mayor a 10 caracteres"
                                        : ""
                            }
                            FormHelperTextProps={{ sx: { color: "error.main" } }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Segundo apellido"
                            color='textField'
                            variant="outlined"
                            name="secondLastName"
                            type='text'
                            value={secondLastName}
                            onChange={(e) => setSecondLastName(capitalizeFirstLetter(e.target.value))}
                            fullWidth
                            inputProps={{ maxLength: 11 }}
                            helperText={
                                (!minLength(secondLastName, 3) && secondLastName)
                                    ? "Este campo debe tener al menos 3 caracteres"
                                    : (!maxLength(secondLastName, 10) && secondLastName)
                                        ? "Este campo no puede ser mayor a 10 caracteres"
                                        : ""
                            }
                            FormHelperTextProps={{ sx: { color: "error.main" } }}
                        />

                    </Grid>
                    <Grid item xs={4}>
                        <SelectDepartment
                            value={department}
                            onChange={(e, item) => {
                                setDepartment(e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectCity
                            value={city}
                            setCity={setCity}
                            department={department}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Celular"
                            color='textField'
                            type='text'
                            variant="outlined"
                            value={contactNumber}
                            onChange={(e) => {
                                const value = e.target.value.slice(0, 10);
                                setContactNumber(value)
                            }}
                            fullWidth
                            helperText={
                                !isCellPhone(contactNumber) && contactNumber
                                    ? "Número de celular incorrecto"
                                    : ""
                            }
                            FormHelperTextProps={{ sx: { color: "error.main" } }}
                            required
                        />
                    </Grid>
                    {action === "register" && (
                        <>
                            <Grid item xs={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
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
                        </>
                    )}
                </Grid>
                <Grid
                    container
                    mt={6}
                    direction="column"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <Grid sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <FormControlLabel
                            value="end"
                            control={<Checkbox color='secondary' checked={conditios} onChange={(e) => setConditios(e.target.checked)} />}
                            labelPlacement="end"
                        />
                        <Button
                            color='secondary'
                            onClick={(e) => { setOpen(true) }}
                            size="small">
                            Terminos y condiciones
                        </Button>
                        <Conditions open={open} setOpen={setOpen} />
                    </Grid>
                    <Grid mt={2}>
                        {/* <Recaptcha onChange={() => setRecaptchaIsValid(!recaptchaIsValid)} /> */}
                    </Grid>
                    <Grid mt={4}>
                        <Button type="submit" color='secondary' disabled={!conditios || isDisable()}>register</Button>
                        {/* <Button type="submit" color='secondary' disabled={!recaptchaIsValid || !conditios || isDisable()}>register</Button> */}
                    </Grid>
                </Grid>
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