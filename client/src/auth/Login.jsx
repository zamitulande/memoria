import {
    Modal,
    Box,
    Button,
    FormControl,
    InputLabel,
    TextField,
    IconButton,
    InputAdornment,
    Grid,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Cancel';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../config/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveAccount, setLogin, setRole, setToken, setUserId, setUserName } from '../redux/features/userSlice';
import ForgetPassword from './ForgetPassword';

const Login = ({ open, setOpen }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getActiveAccount = useSelector((state) => state.user.activeAccount)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [openModalForget, setOpenModalForget] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const postLogin = async () => {
            try {
                const response = await axiosClient.post('/auth/authenticate', user);

                if (response.data.token && response.data.role && response.status == "200") {
                    dispatch(setLogin(true));
                    dispatch(setToken(response.data.token));
                    dispatch(setRole(response.data.role));
                    dispatch(setUserId(response.data.userId));
                    setUser({
                        email: '',
                        password: ''
                    })
                    dispatch(setActiveAccount(false))
                    setOpen(false)
                    dispatch(setUserName(response.data.userName))
                    navigate('/');
                }
            } catch (error) {
                console.log(error)
                if (!error.response) {
                    // No response from the server
                    Swal.fire({
                        icon: "error",
                        title: "Error de Conexión...",
                        text: "No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde.",
                        customClass: {
                            container: 'my-swal'
                        },
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error...",
                        text: error.response.data.message,
                        customClass: {
                            container: 'my-swal'
                        },
                    });
                }
                setUser({
                    email: '',
                    password: ''
                });
            }
        }
        postLogin();
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    const handleCloseModal = () => {
        setOpen(false)
        dispatch(setActiveAccount(false))
    }

    return (
        <Modal
            open={open || getActiveAccount}
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
                <form onSubmit={handleSubmit}>
                    <FormControl
                        variant="standard"
                        fullWidth
                        style={{ paddingTop: 10 }}>
                        <InputLabel shrink htmlFor="bootstrap-input">
                            Correo electronico
                        </InputLabel>
                        <TextField sx={{ border: 2, borderRadius: 1 }}
                            name="email"
                            type='email'
                            placeholder="Escribe aquí tu email"
                            value={user.email}
                            onChange={handleOnChange}
                            fullWidth
                            margin="normal"
                            size="small"
                            required
                        />
                    </FormControl>
                    <FormControl
                        variant="standard"
                        fullWidth
                        style={{ paddingTop: 10 }}>
                        <InputLabel shrink htmlFor="bootstrap-input">
                            Contraseña
                        </InputLabel>
                        <TextField sx={{ border: 2, borderRadius: 1 }}
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Escribe aquí tu contraseña"
                            value={user.password}
                            onChange={handleOnChange}
                            fullWidth
                            margin="normal"
                            size="small"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center'
                                }}
                            >
                                <Button onClick={(e) => setOpenModalForget(true)}>
                                    ¿Olvidó su contraseña?
                                </Button>
                                <ForgetPassword open={openModalForget} setOpen={setOpenModalForget} />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                color='success'
                                type="submit"
                                fullWidth
                                sx={{
                                    height: '100%'
                                }}
                            >
                                Ingresar
                            </Button>
                        </Grid>
                    </Grid>
                    <p>
                        ¿No tiene una cuenta de usuario?, haga <Link to='usuarios/registrar' onClick={handleCloseModal}>click aquí</Link> para registrarse.
                    </p>
                </form>
            </Box>
        </Modal>
    )
}

export default Login