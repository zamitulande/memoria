import {
    Modal,
    Box,
    Button,
    FormControl,
    InputLabel,
    TextField,
    IconButton,
    DialogContent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Cancel';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ open, setOpen }) => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const postUser = async () => {
            try {
                console.log('enviando')
            } catch (error) {
                console.log(error)
            }
        }
        postUser();
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

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

    return (
        <Modal
            open={open}
            onClose={(e) => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={(e) => setOpen(false)}
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
                            Usuario
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
                            required />
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
                            type='password'
                            placeholder="Escribe aquí tu contraseña"
                            value={user.password}
                            onChange={handleOnChange}
                            fullWidth
                            margin="normal"
                            size="small"
                            required />
                    </FormControl>
                    <IconButton
                        sx={{
                            left: '40%',
                        }}
                    >
                        <LoginIcon />
                    </IconButton>
                    <Box sx={{mt:4}}>
                        <Link>¿Olvidó su contraseña?</Link>
                    </Box>
                    <p>
                        ¿No tiene una cuenta de usuario?, haga <Link to='usuarios/registrar' onClick={(e) => setOpen(false)}>click aquí</Link> para registrarse.
                    </p>
                </form>
            </Box>
        </Modal>
    )
}

export default Login