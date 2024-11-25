
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import chivaWebp from '../../assets/header/Chiva.webp';
import logoPngD from '../../assets/header/logoD.png'
import logoWebpD from '../../assets/header/logoD.webp'
import logoPngM from '../../assets/header/logo.png'
import logoWebpM from '../../assets/header/logo.webp'
import {
    BottomNavigation,
    BottomNavigationAction,
    Tooltip,
    Button,
    ButtonGroup,
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    useMediaQuery,
    Grid,
} from '@mui/material';
import { Fragment, lazy, Suspense, useState } from 'react';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../redux/features/userSlice';
import { clearTestimonies } from '../../redux/features/TestimonySlice';
import Image from 'react-image-webp';

const Login = lazy(() => import('../../auth/Login'));
const ResetPassword = lazy(() => import('../../auth/ResetPassword'));

const Header = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();

    const pages = [
        { item: 'Inicio', id: 1, path: '/' },
        { item: 'Nosotros', id: 2, path: 'nosotros' },
        { item: 'Repositorio', id: 3, path: 'repositorio' },
        { item: 'Colaboraciones', id: 4, path: 'colaboraciones' },
        { item: 'Datos Abiertos', id: 5, path: 'datos-abiertos' },
        { item: 'Usuarios', id: 6, path: 'usuarios' },
    ];

    const buttonsAuth = [
        { item: 'Ingresar', id: 1 },
        { item: 'Registrar', id: 2, path: 'usuarios/registrar' },
        { item: 'Cambiar contraseña', id: 3 },
        { item: 'Cerrar Sesion', id: 4 },
    ];

    const [open, setOpen] = useState(false);
    const [openResetPassword, setOpenResetPassword] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [valuePage, setValuePage] = useState(0)

    const login = useSelector((state) => state.user.login)
    const role = useSelector((state) => state.user.role)
    const userName = useSelector((state) => state.user.userName)

    const handleMenuOpen = (setter) => (event) => {
        setter(event.currentTarget);
    };

    const handleMenuClose = (setter) => () => {
        setter(null);
    };

    const handleLogout = () => {
        dispatch(setLogin(false))
        dispatch(clearTestimonies());
    }

    const filteredPages = pages.filter(page => {
        if (page.item === 'Usuarios' && (!login || role !== 'ADMIN')) {
            return false;
        }
        return true;
    });

    const filteredAuth = login
        ? buttonsAuth.filter(button => button.id === 3 || button.id === 4)
        : buttonsAuth.filter(button => button.id === 1 || button.id === 2);

    return (
        <>
            <AppBar position="fixed" color='lightWhite'
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${chivaWebp})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.9)',
                    zIndex: 1000
                }}>
                <Toolbar sx={{ justifyContent: 'space-around', display: { xs: 'none', md: 'flex' } }}>
                    {login ? <Typography sx={{ color: 'lightWhite.main', fontWeight: 'bold', display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: 1 }}><AccountCircleIcon />{userName}</Typography> : null}
                </Toolbar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{mt:0}}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, mt:-8 }}>
                        <Image
                            src={logoPngD}
                            webp={logoWebpD}
                            height="100px"
                        />
                        </Box>

                        {/* :::START MOVIL FIRST NAVBAR:: */}

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenuOpen(setAnchorElNav)}
                                sx={{ color: 'lightWhite.main' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleMenuClose(setAnchorElNav)}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <ButtonGroup
                                    orientation="vertical"
                                    variant="contained"
                                    aria-label="Vertical button group"
                                >
                                    {filteredPages.map((page) => (
                                        <Link
                                            to={page.path}
                                            key={page.id}>
                                            <Button
                                                onClick={handleMenuClose(setAnchorElNav)}
                                                sx={{
                                                    color: 'grayDark.main',
                                                    backgroundColor: 'textField.main',
                                                }}
                                            >
                                                {page.item}
                                            </Button>
                                        </Link>
                                    ))}
                                </ButtonGroup>
                            </Menu>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                            <Image
                                src={logoPngM}
                                webp={logoWebpM}
                                width="25px"
                            />
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'lightWhite.main',
                                textDecoration: 'none',
                            }}
                        >
                            Memoria Oral
                        </Typography>

                        {/* :::END MOVIL FIRST NAVBAR:: */}

                        <Box pb={3} sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                            <Grid container direction="column" alignItems="center" spacing={2}>
                                
                                <Grid item sx={{ width: '100%' }}>
                                    <BottomNavigation
                                        style={{ backgroundColor: "transparent" }}
                                        showLabels
                                        value={valuePage}
                                        onChange={(event, newValue) => {
                                            setValuePage(newValue);
                                        }}>
                                        {filteredPages.map((page) => (
                                            <BottomNavigationAction

                                                sx={{
                                                    fontWeight: '400',
                                                    color: 'lightWhite.main',
                                                    '&.Mui-selected': {
                                                        fontWeight: '700',
                                                        color: 'lightWhite.main',
                                                        borderBottom: 'solid 2px white'
                                                    },
                                                    '.MuiBottomNavigationAction-label': {
                                                        fontSize: '0.9rem',
                                                    },
                                                }}
                                                key={page.id}
                                                component={Link}
                                                to={page.path}
                                                label={page.item}
                                            >
                                            </BottomNavigationAction>
                                        ))}
                                    </BottomNavigation>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* :::START MOVIL FIRST LOGIN:: */}

                        <Box>
                            <Tooltip title="Abrir opciones.">
                                <div>
                                    {/* Renderizar el botón solo en pantallas medianas y superiores */}
                                    <Button
                                        color='primary'
                                        variant="contained"
                                        sx={{ display: { xs: 'none', md: 'flex' } }}
                                        onClick={handleMenuOpen(setAnchorElUser)}
                                    >
                                        {login ? 'Opciones' : 'Acceder'}
                                    </Button>

                                    {/* Renderizar el ícono en pantallas pequeñas */}
                                    <IconButton
                                        onClick={handleMenuOpen(setAnchorElUser)}
                                        sx={{ display: { xs: 'flex', md: 'none' }, p: 0 }}
                                    >
                                        <LoginIcon sx={{ color: 'lightWhite.main' }} />
                                    </IconButton>
                                </div>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleMenuClose(setAnchorElUser)}
                            >
                                <ButtonGroup orientation="vertical" variant="contained" aria-label="Vertical button group">
                                    {filteredAuth.map((button) => (
                                        <Fragment key={button.id}>
                                            {button.id === 1 ? (
                                                <>
                                                    <Button
                                                        onClick={(e) => {
                                                            setOpen(true)
                                                            handleMenuClose(setAnchorElUser)();
                                                        }}
                                                        size="small"
                                                        sx={{ backgroundColor: 'textField.main', '&:hover': { backgroundColor: '#f1f1f1' } }}
                                                    >
                                                        {button.item}
                                                    </Button>
                                                    <Suspense fallback={<div>Cargando...</div>}>
                                                        <Login open={open} setOpen={setOpen} />
                                                    </Suspense>

                                                </>
                                            ) : button.path ? (
                                                <Link to={button.path}>
                                                    <Button
                                                        onClick={handleMenuClose(setAnchorElUser)}
                                                        size="small"
                                                        sx={{ backgroundColor: 'textField.main', '&:hover': { backgroundColor: '#f1f1f1' } }}
                                                    >
                                                        {button.item}
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <>
                                                    <Button
                                                        onClick={() => {
                                                            if (button.id === 4) handleLogout();
                                                            if (button.id === 3) setOpenResetPassword(true);
                                                            handleMenuClose(setAnchorElUser)();
                                                        }}
                                                        size="small"
                                                        sx={{ backgroundColor: 'textField.main', '&:hover': { backgroundColor: '#f1f1f1' } }}
                                                    >
                                                        {button.item}
                                                    </Button>
                                                    <Suspense fallback={<div>Cargando...</div>}>
                                                        <ResetPassword open={openResetPassword} setOpen={setOpenResetPassword} />
                                                    </Suspense>
                                                </>
                                            )}
                                        </Fragment>
                                    ))}
                                </ButtonGroup>
                            </Menu>
                        </Box>
                        {/* :::END MOVIL FIRST LOGIN:: */}
                    </Toolbar>
                </Container>
            </AppBar>
            {isMobile ? <Box sx={{ height: '50px' }} /> : <Box sx={{ height: '160px', }} />}
        </>
    )
}

export default Header