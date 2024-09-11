import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SelectDepartment from '../../../helpers/components/SelectDepartment';
import SelectCity from '../../../helpers/components/SelectCity';
import { Link } from 'react-router-dom';
import UseValidation from '../../../helpers/hooks/UseValidation'
import Conditions from '../../../helpers/components/Conditions';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Recaptcha from '../../../helpers/components/Recaptcha';



const Form = ({ open,
    setOpen,
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    identification,
    setIdentification,
    email,
    setEmail,
    confirmEmail,
    setConfirmEmail,
    firstName,
    setFirstName,
    secondName,
    setSecondName,
    firstLastName,
    setFirstLastName,
    secondLastName,
    setSecondLastName,
    department,
    setDepartment,
    contactNumber,
    setContactNumber,
    city,
    setCity,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setFile,
    recaptchaIsValid,
    setRecaptchaIsValid,
    conditios,
    setConditios,
    isDisable,
    handleSubmitRegisterUser,
    handleSubmitUpdate,
    action,
    role,
    minLength,
    maxLength,
    handleSubmitRegisterAdmin,
    getFormEditar,
    fileName,
    setFileName
}) => {

    const login = useSelector((state) => state.user.login)
    const { isCellPhone, passwordValid, capitalizeFirstLetter } = UseValidation(); 

    let imagen = "";

    if (login) {
        if (action === 'register' && role === 'ADMIN') {
            imagen =  <Grid container direction="column" alignItems="center">
            <Grid item>
                <input
                    accept="application/pdf"
                    id="icon-button-file"
                    onChange={(e) => {setFile(e.target.files), setFileName(e.target.files[0].name); }}
                    type="file"
                    style={{ display: 'none' }}
                    required
                />
                <label htmlFor="icon-button-file">
                    <IconButton component="span">
                        <CloudUploadIcon fontSize='large' />
                    </IconButton>
                </label>
            </Grid>
            {fileName && (
                <Grid item sx={{backgroundColor:'secondary.main', padding:2}}>
                    <Typography  color="textField.main">Cargado:_{fileName}</Typography>
                </Grid>
            )}
            <Grid item>
                <Typography variant="body1">Consentimiento informado</Typography>
            </Grid>
           
        </Grid>

        }
    }
    const determineSubmitHandler = () => {
        switch (true) {
            case action === 'register' && role === 'ADMIN':
                return handleSubmitRegisterAdmin;
            case action === 'register':
                return handleSubmitRegisterUser;
            case action === 'update':
                return handleSubmitUpdate;
            default:
                return (event) => event.preventDefault(); // Default handler
        }
    };

    return (
        <form onSubmit={determineSubmitHandler()}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={4}>
                    <TextField
                        label="Identificacion"
                        color='textField'
                        variant="outlined"
                        name="identification"
                        type='number'
                        value={action === 'register' ? identification : undefined}
                        defaultValue={action === 'update' ? getFormEditar.identification : undefined}
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
                        value={action === 'register' ? email : undefined}
                        defaultValue={action === 'update' ? getFormEditar.email : undefined}
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
                        value={action === 'register' ? confirmEmail : undefined}
                        defaultValue={action === 'update' ? getFormEditar.confirmEmail : undefined}
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
                        value={action === 'register' ? firstName : undefined}
                        defaultValue={action === 'update' ? getFormEditar.firstName : undefined}
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
                        value={action === 'register' ? secondName : undefined}
                        defaultValue={action === 'update' ? getFormEditar.secondName : undefined}
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
                        value={action === 'register' ? firstLastName : undefined}
                        defaultValue={action === 'update' ? getFormEditar.firstLastName : undefined}
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
                        value={action === 'register' ? secondLastName : undefined}
                        defaultValue={action === 'update' ? getFormEditar.secondLastName : undefined}
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
                        value={action === 'register' ? department : getFormEditar.department}
                        onChange={(e, item) => {
                            setDepartment(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <SelectCity
                        value={action === 'register' ? city : getFormEditar.municipio}
                        setCity={setCity}
                        department={action === 'register' ? department : getFormEditar.department}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Celular"
                        color='textField'
                        type='text'
                        variant="outlined"
                        value={action === 'register' ? contactNumber : undefined}
                        defaultValue={action === 'update' ? getFormEditar.contactNumber : undefined}
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
                        {imagen}
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
                {action === 'register' ?
                    <Grid >
                        <FormControlLabel
                            value="end"
                            control={<Checkbox color='secondary' checked={conditios} onChange={(e) => setConditios(e.target.checked)} />}
                            labelPlacement="end"
                        />
                        <Button
                            color='grayDark'
                            onClick={(e) => { setOpen(true) }}
                            size="small">
                            Terminos y condiciones
                        </Button>
                        <Conditions open={open} setOpen={setOpen} />
                    </Grid> : null
                }
                <Grid mt={2}>
                    <Recaptcha onChange={() => setRecaptchaIsValid(!recaptchaIsValid)} />
                </Grid>
                <Grid mt={4}>
                    {action === 'update' ? <Link to="/usuarios"> <Button color='secondary'>Cancelar</Button></Link> : null}
                    <Button variant='contained' type="submit" color='secondary' disabled={action === 'register' ? !recaptchaIsValid || !conditios || isDisable(): null}>{action === 'register' ? 'Registrar' : 'Actualizar'}</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default Form